import React from 'react';
import LiquidGlass from './LiquidGlass';
import LiquidGlassFallback from './LiquidGlassFallback';

class SafeLiquidGlass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("LiquidGlass 3D Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={`w-full h-full ${this.props.className}`} style={{ filter: `blur(${this.props.blur || '40px'})` }}>
          <LiquidGlassFallback color={this.props.color} />
        </div>
      );
    }

    return <LiquidGlass {...this.props} />;
  }
}

export default SafeLiquidGlass;