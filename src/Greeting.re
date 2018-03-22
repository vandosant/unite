open ReasonReact;

let getWithDefault = Js.Option.getWithDefault;

let component = statelessComponent("Greeting");

let defaultText = "Welcome to my blog post!";

/**
 * The Header component renders a nice welcome message
 */
let make = (~message=?, _children) => {
  ...component,
  render: (_self) => {
    let text = message |> getWithDefault(defaultText);
    <div>
      <h3>
        <span>(stringToElement(text))</span>
        <Icon name="wechat" size="big" />
      </h3>
    </div>
  }
};

/** Create a new instance from a JS props object */
let fromJsProps = (props) => make(~message=props##message, [||]);

let default = ReasonReact.wrapReasonForJs(~component, fromJsProps);
