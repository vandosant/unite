[@bs.module "semantic-ui-react"] external icon : ReasonReact.reactClass = "Icon";

let component = ReasonReact.statelessComponent("UserSelect");

type user = {
  text: string,
  value: int
};

type userList = list(user);


let make = (~selectedUser: user, ~onSelect, ~userOptions: userList, _children) => {
  let handleChange = (_event, _self) => onSelect();
  {
    ...component,
    render: self =>
      <Menu compact=true>
        <Dropdown
          onChange={self.handle(handleChange)}
          placeholder="Select your user"
          selection=true
          options={userOptions}
          value={selectedUser.value}
        />
      </Menu>
  }
};

let fromJsProps = (props) =>
  make(
    ~selectedUser=props##selectedUser,
    ~onSelect=props##onSelect,
    ~userOptions=props##userOptions,
    [||]
  );

let default = ReasonReact.wrapReasonForJs(~component, fromJsProps);
