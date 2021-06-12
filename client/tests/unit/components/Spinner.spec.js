import { mount } from "@vue/test-utils";
import Spinner from "@/components/Spinner";
import { STYLES } from "@/components/Spinner";

const mountSpinner = (variant, flag = false) => {
  return mount(Spinner, {
    propsData: {
      variant: variant || undefined,
      flag,
    },
  });
};

describe("Spinner", () => {
  it('is hidden by default', () => {
    expect(mountSpinner(undefined, false)).toMatchSnapshot();
  });

  it.each(STYLES)("checks basic rendering of variant %s", (variant) => {
    expect(mountSpinner(variant, true)).toMatchSnapshot();
  });
});
