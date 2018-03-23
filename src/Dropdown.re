[@bs.module "semantic-ui-react"] external dropdown : ReasonReact.reactClass = "Dropdown";

let make = (
  ~placeholder: option(string)=?,
  ~selection: option(bool)=?,
  ~value: option(int)=?,
  ~onChange=?,
  ~options=?,
  children
) =>
  ReasonReact.wrapJsForReason(
    ~reactClass=dropdown,
    ~props={
      "placeholder": Js.Nullable.fromOption(placeholder),
      "selection": Js.Nullable.fromOption(selection),
      "value": Js.Nullable.fromOption(value),
      "onChange": onChange,
      "options": options
    },
    children
  );
