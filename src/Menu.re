[@bs.module "semantic-ui-react"] external menu : ReasonReact.reactClass = "Menu";

let make = (~compact: option(bool)=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=menu,
    ~props={"compact": Js.Nullable.fromOption(compact)},
    children
  );
