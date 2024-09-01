import { TASKS } from "./tasks-list";

describe("TASKS", () => {
  it("should be an array", () => {
    expect(TASKS).toBeInstanceOf(Array);
  });

  it("should have a key", () => {
    TASKS.forEach((task) => {
      expect(task.key).toBeDefined();
      expect(typeof task.key).toBe("string");
      expect(task.key).not.toBe("");
      // All lowercase
      expect(task.key).toBe(task.key.toLowerCase());
      // No spaces
      expect(task.key.includes(" ")).toBe(false);
      // No dashes
      expect(task.key.includes("-")).toBe(false);
    });
  });

  it("should have a title", () => {
    TASKS.forEach((task) => {
      expect(task.title).toBeDefined();
      expect(typeof task.title).toBe("string");
      // Should include uppercase, so not match lowercase
      expect(task.title.toLowerCase()).not.toBe(task.title);
    });
  });

  it("should have measures", () => {
    TASKS.forEach((task) => {
      expect(task.measures).toBeDefined();
      expect(task.measures).toBeInstanceOf(Array);
      task.measures.forEach((measure) => {
        expect(measure.title).toBeDefined();
        expect(typeof measure.title).toBe("string");
        expect(measure.key).toBeDefined();
        expect(typeof measure.key).toBe("string");
        // All lowercase
        expect(measure.key).toBe(measure.key.toLowerCase());
        // No spaces
        expect(measure.key.includes(" ")).toBe(false);
        // No dashes
        expect(measure.key.includes("-")).toBe(false);
      });
    });
  });

  it("should have a validateObject function", () => {
    TASKS.forEach((task) => {
      expect(task.validateObject).toBeDefined();
      expect(typeof task.validateObject).toBe("function");
    });
  });

  it("validateObject should fail empty {} validation", () => {
    TASKS.forEach((task) => {
      const result = task.validateObject(undefined);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("No value provided");
      }
    });
  });

  it("validateObject should fail validation for wrong measures", () => {
    TASKS.forEach((task) => {
      const result = task.validateObject({ made_up_key: 1 });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Missing measure");
      }
    });
  });

  it("validateObject should succeed validation for correct measures", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.reduce((acc, measure) => {
        acc[measure.key] = 1;
        return acc;
      }, {} as Record<string, number>);
      expect(task.validateObject(toValidate)).toEqual({
        success: true,
        value: toValidate,
      });
    });
  });

  it("validateObject should fail validation if one random measure is missing", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.reduce((acc, measure) => {
        acc[measure.key] = 1;
        return acc;
      }, {} as Record<string, number>);

      // Remove one measure
      delete toValidate[task.measures[0].key];
      const result = task.validateObject(toValidate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Missing measure");
      }
    });
  });

  it("validateArray should fail validation for wrong measures", () => {
    TASKS.forEach((task) => {
      const result = task.validateArray([{ made_up_key: 1 }]);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid item");
      }
    });
  });

  it("validateArray should fail validation for extra measures", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.map((measure) => ({ key: measure.key, number: 1 }));
      // Add one measure
      toValidate.push({ key: "made_up_key", number: 1 });
      const result = task.validateArray(toValidate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid item");
      }
    });
  });

  it("validateArray should fail validation for missing measure keys", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.map((measure) => ({ key: measure.key, number: 1 }));
      // Remove one measure
      toValidate.pop();
      const result = task.validateArray(toValidate);
      expect(result.success).toBe(false);
    });
  });

  it("validateArray should fail validation for non-number values", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.map((measure) => ({ key: measure.key, number: "1" }));
      const result = task.validateArray(toValidate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid item");
      }
    });
  });

  it("validateArray should fail validation for non-object values", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.map((measure) => 1);
      const result = task.validateArray(toValidate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Invalid item");
      }
    });
  });

  it("validateArray should fail if duplicate measures are provided", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.map((measure) => ({ key: measure.key, number: 1 }));
      toValidate.push({ key: toValidate[0].key, number: 1 });
      const result = task.validateArray(toValidate);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toContain("Duplicate measure");
      }
    });
  });

  it("validateArray should succeed validation for correct measures", () => {
    TASKS.forEach((task) => {
      const toValidate = task.measures.map((measure) => ({ key: measure.key, number: 1 }));
      expect(task.validateArray(toValidate)).toEqual({
        success: true,
        value: toValidate,
      });
    });
  });
});
