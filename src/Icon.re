[@bs.module "semantic-ui-react"] external icon : ReasonReact.reactClass = "Icon";

let make = (~name: string, ~size: option(string)=?, children) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=icon,
    ~props={"name": name, "size": Js.Nullable.fromOption(size)},
    children
  );
