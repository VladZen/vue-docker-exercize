import "@testing-library/jest-dom";
import { nextTick } from "vue";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { toBeVisible } from "@testing-library/jest-dom/matchers";

expect.extend({
  toBeVisible,
});

global.nextTick = nextTick;

global.timeout = (duration = 0) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });

global.createAxiosMock = (props = {}) => new MockAdapter(axios, props);

global.resetAxiosMock = (mockInstance) => mockInstance.resetHandlers();
