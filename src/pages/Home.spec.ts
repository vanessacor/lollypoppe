import { mount } from "@vue/test-utils";
import Home from "./Home.vue";

describe("Home.vue", () => {
  it("renders ", () => {
    const wrapper = mount(Home);
    expect(wrapper.text()).toMatch("This is Homepage");
  });
});
