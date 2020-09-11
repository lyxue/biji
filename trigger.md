不跳转选择：

```
import React, {Component, cloneElement} from 'react';
import PropTypes from 'prop-types';
import {render, unmountComponentAtNode} from 'react-dom';

const CONTAINER_ID = 'x6-addon-trigger-container';

class Trigger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTrigger: false
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps() {
    this.forceRender();
  }

  componentWillUnmount() {
    this.hideTrigger();
  }

  showTrigger() {
    if (!this.props.disabled) {
      this.setState({showTrigger: true}, () => {
        window.originalSubmit = window.onSubmit;
        window.originalTurnBack = window.onTurnBack;

        window.onTurnBack = this.hideTrigger.bind(this, Trigger.TURNBACK);
        window.onSubmit = this.hideTrigger.bind(this, Trigger.SUBMIT);

        this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

        document.body.className = document.body.className + ' x6-has-addon';
        this.addon = document.getElementById(CONTAINER_ID);
        if (!this.addon) {
          this.addon = document.createElement('div');
          this.addon.className = CONTAINER_ID;
          this.addon.id = CONTAINER_ID;
          document.body.appendChild(this.addon);
        }
        this.forceRender();

        this.props.onTriggerChange && this.props.onTriggerChange(Trigger.SHOW);
      });
    }
  }

  hideTrigger(type) {
    this.setState({showTrigger: false}, () => {
      window.onSubmit = window.originalSubmit;
      window.onTurnBack = window.originalTurnBack;
      document.body.className = document.body.className.replace(' x6-has-addon', '');
      document.body.scrollTop = this.scrollTop;
      document.documentElement.scrollTop = this.scrollTop;
      unmountComponentAtNode(this.addon);
      this.props.onTriggerChange && this.props.onTriggerChange(type);
    });
  }

  forceRender() {
    setTimeout(() => {
      if (this.props.content && this.state.showTrigger) {
        render(
          cloneElement(this.props.content, {hideTrigger: () => this.hideTrigger(Trigger.CHILD_EVNET)}),
          this.addon,
          () => {
            if (!this.props.source) {
              document.documentElement.scrollTop = 0;
              document.body.scrollTop = 0;
            }
          })
      }
    }, 10)
  }

  render() {
    if (typeof this.props.children === 'string') {
      return <span onClick={this.showTrigger.bind(this)}>{this.props.children}</span>
    }
    return cloneElement(this.props.children, {
      showTrigger: () => this.showTrigger(),
      onClick: () => this.showTrigger(),
    })
  }
}

Trigger.TURNBACK = 'turnback';
Trigger.SUBMIT = 'submit';
Trigger.SHOW = 'show';
Trigger.CHILD_EVNET = 'childEvent';
Trigger.propTypes = {
  onTriggerChange: PropTypes.func,
  content: PropTypes.element
};
export default Trigger;

```

css：

```
.x6-addon-trigger-container {
  background-color: #fff;
  opacity: 0;
  height: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  animation: addon 0.2s;
  transition: all;
}

.x6-has-addon {
  #root .main-body {
    & > * {
      display: none;
    }

    & > .render-assistant-setting {
      display: block;
    }

    & > .assistant-ball, & > .sub-menu-container {
      display: flex;
    }

    .nav-bar {
      display: flex;
    }
  }

  .x6-addon-container, .x6-addon-trigger-container {
    opacity: 1;
    height: auto;
  }
}
```

