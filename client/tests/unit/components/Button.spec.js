import { mount } from "@vue/test-utils";
import Button from "@/components/Button";
import { STYLES } from "@/components/Button";

const mountButton = (variant) => {
  return mount(Button, {
    propsData: variant ? { variant } : {},
    slots: {
      default: "<span>Button</span>",
    },
  });
};

describe("Button", () => {
  it.each(STYLES)("checks basic rendering of variant %s", (variant) => {
    expect(mountButton(variant)).toMatchSnapshot();
  });
});
