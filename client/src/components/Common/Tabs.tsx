type Tab = {
  label: string;
  value: string;
};

type TabsProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Tab[];
  divStyle?: string;
  buttonStyle?: string;
  activeButtonStyle?: string;
};

const Tabs = (props: TabsProps) => {
  return (
    <div
      className={
        props.divStyle ?? "flex justify-center space-x-4 mb-8 h-16 w-full"
      }
    >
      {props.tabs.map((tab) => (
        <button
          key={tab.value}
          className={
            props.buttonStyle
              ? props.activeTab === tab.value
                ? props.activeButtonStyle
                : props.buttonStyle
              : `tab-button dark:bg-blue-dark-500 p-2 rounded-sm w-3/12 ${
                  props.activeTab === tab.value
                    ? "border-b-4 border-b-blue-600"
                    : ""
                }`
          }
          onClick={() => props.setActiveTab(tab.value)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
