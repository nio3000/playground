import { Component, PropTypes, createElement } from 'react';

class LazyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      component: null
    };
  }

  componentDidMount() {
    this.loadModule();
  }

  async loadModule() {
    try {
      const { default: component } = await import(`components/${ this.props.path }/index.js`);

      this.setState({ component });
    } catch (error) {
      LazyComponent.handleModuleError(error);
    }
  }

  render() {
    const { component } = this.state;

    return component && createElement(component);
  }

  static handleModuleError(error) {
    throw new Error(`Module loading failed: ${ error }`);
  }
}

LazyComponent.propTypes = {
  path: PropTypes.string.isRequired
};

export default LazyComponent;