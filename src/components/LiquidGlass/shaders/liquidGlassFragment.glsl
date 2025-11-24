varying vec3 vNormal;
varying vec3 vPosition;
varying float vDisplacement;

uniform vec3 uColor;
uniform float uGlossiness;

void main() {
  vec3 viewDirection = normalize(cameraPosition - vPosition);
  vec3 normal = normalize(vNormal);
  
  // Fresnel effect
  float fresnelTerm = dot(viewDirection, normal);
  fresnelTerm = clamp(1.0 - fresnelTerm, 0.0, 1.0);
  fresnelTerm = pow(fresnelTerm, 3.0); // Sharpen the rim
  
  // Base color mixed with displacement for depth
  vec3 baseColor = uColor + vDisplacement * 0.1;
  
  // Specular highlight (simple Blinn-Phong approximation)
  vec3 lightDir = normalize(vec3(1.0, 1.0, 1.0));
  vec3 halfVector = normalize(lightDir + viewDirection);
  float NdotH = max(0.0, dot(normal, halfVector));
  float specular = pow(NdotH, uGlossiness);
  
  // Combine
  vec3 finalColor = mix(baseColor, vec3(1.0), fresnelTerm * 0.8);
  finalColor += vec3(specular);
  
  // Add a subtle inner glow/refraction fake
  float innerGlow = smoothstep(0.0, 1.0, vDisplacement);
  finalColor += uColor * innerGlow * 0.2;

  gl_FragColor = vec4(finalColor, 0.85); // Slightly transparent
}