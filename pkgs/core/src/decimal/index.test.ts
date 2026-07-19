import { describe, expect, it } from "vitest";
import { FixedDecimal } from "./index.ts";

describe("FixedDecimal", () => {
  it("accepts whole numbers", () => {
    expect(new FixedDecimal("0").toNumber()).toBe(0);
    expect(new FixedDecimal("1").toNumber()).toBe(1);
    expect(new FixedDecimal("1234").toNumber()).toBe(1234);
    expect(new FixedDecimal("123456789").toNumber()).toBe(123456789);
    expect(new FixedDecimal("12345678901234567890").toNumber()).toBe(
      12345678901234567890,
    );
  });

  it("accepts decimal numbers", () => {
    expect(new FixedDecimal("0.1").toNumber()).toBe(0.1);
    expect(new FixedDecimal("0.1234").toNumber()).toBe(0.1234);
    expect(new FixedDecimal("12.34").toNumber()).toBe(12.34);
    expect(new FixedDecimal("10.001234").toNumber()).toBe(10.001234);
    expect(new FixedDecimal("0.001234").toNumber()).toBe(0.001234);
    expect(new FixedDecimal("9876543210.123456789").toNumber()).toBe(
      9876543210.123456789,
    );
  });

  it("accepts scientific notation", () => {
    expect(new FixedDecimal(1.23456e-10).toNumber()).toBe(1.23456e-10);
    expect(new FixedDecimal(1.23456e21).toNumber()).toBe(1.23456e21);
  });

  it("accepts tiny float", () => {
    expect(new FixedDecimal(new FixedDecimal("0")).toNumber()).toBe(0);
    expect(new FixedDecimal(new FixedDecimal("1")).toNumber()).toBe(1);
    expect(
      new FixedDecimal(new FixedDecimal("12345678901234567890")).toNumber(),
    ).toBe(12345678901234567890);
    expect(new FixedDecimal(new FixedDecimal("0.1")).toNumber()).toBe(0.1);
    expect(new FixedDecimal(new FixedDecimal("10.001234")).toNumber()).toBe(
      10.001234,
    );
    expect(
      new FixedDecimal(new FixedDecimal("9876543210.123456789")).toNumber(),
    ).toBe(9876543210.123456789);
  });

  it("accepts number", () => {
    expect(new FixedDecimal(new FixedDecimal(0)).toNumber()).toBe(0);
    expect(new FixedDecimal(new FixedDecimal(1)).toNumber()).toBe(1);
    expect(
      new FixedDecimal(new FixedDecimal(12345678901234567890)).toNumber(),
    ).toBe(12345678901234567890);
    expect(new FixedDecimal(new FixedDecimal(0.1)).toNumber()).toBe(0.1);
    expect(
      new FixedDecimal(new FixedDecimal(0.0000000000000001)).toNumber(),
    ).toBe(0.0000000000000001);
    expect(new FixedDecimal(new FixedDecimal(10.001234)).toNumber()).toBe(
      10.001234,
    );
    expect(
      new FixedDecimal(new FixedDecimal(9876543210.123456789)).toNumber(),
    ).toBe(9876543210.123456789);
    expect(new FixedDecimal(-0).toNumber()).toBe(0);
    expect(new FixedDecimal(-1).toNumber()).toBe(-1);
    expect(
      new FixedDecimal(new FixedDecimal(-12345678901234567890)).toNumber(),
    ).toBe(-12345678901234567890);
    expect(new FixedDecimal(new FixedDecimal(-0.1)).toNumber()).toBe(-0.1);
    expect(
      new FixedDecimal(new FixedDecimal(-0.0000000000000001)).toNumber(),
    ).toBe(-0.0000000000000001);
    expect(new FixedDecimal(new FixedDecimal(-10.001234)).toNumber()).toBe(
      -10.001234,
    );
    expect(
      new FixedDecimal(new FixedDecimal(-9876543210.123456789)).toNumber(),
    ).toBe(-9876543210.123456789);
  });

  it("rounds numbers", () => {
    expect(new FixedDecimal("0.987654321", 0).toNumber()).toBe(1.0);
    expect(new FixedDecimal("0.987654321", 1).toNumber()).toBe(1.0);
    expect(new FixedDecimal("0.987654321", 2).toNumber()).toBe(0.99);
    expect(new FixedDecimal("0.987654321", 3).toNumber()).toBe(0.988);
    expect(new FixedDecimal("0.987654321", 5).toNumber()).toBe(0.98765);
    expect(new FixedDecimal("0.123456789", 8).toNumber()).toBe(0.12345679);
    expect(new FixedDecimal("-0.987654321", 0).toNumber()).toBe(-1.0);
    expect(new FixedDecimal("-0.987654321", 1).toNumber()).toBe(-1);
    expect(new FixedDecimal("-0.987654321", 2).toNumber()).toBe(-0.99);
    expect(new FixedDecimal("0.7", 0).toNumber()).toBe(1);
    expect(new FixedDecimal("-0.7", 0).toNumber()).toBe(-1);
    expect(new FixedDecimal("0.5", 0).toNumber()).toBe(1);
    expect(new FixedDecimal("-0.5", 0).toNumber()).toBe(-0);
    expect(new FixedDecimal("0.07", 1).toNumber()).toBe(0.1);
    expect(new FixedDecimal("-0.07", 1).toNumber()).toBe(-0.1);
    expect(new FixedDecimal("0.12345678901234567").toNumber()).toBe(
      0.1234567890123457,
    );
    expect(new FixedDecimal("0.12345678901234563").toNumber()).toBe(
      0.1234567890123456,
    );
    expect(new FixedDecimal("9.9", 0).toNumber()).toBe(10);
  });

  it("has default precision corresponding to the number behavior", () => {
    expect(
      new FixedDecimal("1.1").div(new FixedDecimal("1.3")).toNumber(),
    ).toBe(1.1 / 1.3);
  });

  it("allows to specify precision", () => {
    expect(new FixedDecimal("0.123456789", 5).toNumber()).toBe(0.12346);
    expect(new FixedDecimal("0.123456789", 3).toNumber()).toBe(0.123);
    expect(new FixedDecimal("0.0001234", 4).toNumber()).toBe(0.0001);
    expect(new FixedDecimal("0.1234", 9).toNumber()).toBe(0.1234);
    expect(new FixedDecimal("0.1234", 9).toNumber()).toBe(0.1234);
    expect(new FixedDecimal("12.34", 1).toNumber()).toBe(12.3);
    expect(new FixedDecimal("10.12345678901234", 1).toNumber()).toBe(10.1);
    expect(new FixedDecimal("10.12345678901234", 12).toNumber()).toBe(
      10.123456789012,
    );
  });

  it("accepts negative numbers", () => {
    expect(new FixedDecimal("-0.123456789", 5).toNumber()).toBe(-0.12346);
    expect(new FixedDecimal("-0.123456789", 3).toNumber()).toBe(-0.123);
    expect(new FixedDecimal("-0.123456789", 1).toNumber()).toBe(-0.1);
    expect(new FixedDecimal("-0.1", 3).toNumber()).toBe(-0.1);
    expect(new FixedDecimal("-1").toNumber()).toBe(-1);
    expect(new FixedDecimal("-1.2346", 3).toNumber()).toBe(-1.235);
    expect(new FixedDecimal("-321.123456789").toNumber()).toBe(-321.123456789);
    expect(new FixedDecimal("-321.123456789", 5).toNumber()).toBe(-321.12346);
  });

  describe("toString", () => {
    it("returns the number as a string", () => {
      expect(new FixedDecimal("0").toString()).toBe("0.0000000000000000");
      expect(new FixedDecimal("1").toString()).toBe("1.0000000000000000");
      expect(new FixedDecimal("12345678901234567890").toString()).toBe(
        "12345678901234567890.0000000000000000",
      );
      expect(new FixedDecimal("0.1234").toString()).toBe("0.1234000000000000");
      expect(new FixedDecimal("12.34").toString()).toBe("12.3400000000000000");

      expect(new FixedDecimal("0.1234", 6).toString()).toBe("0.123400");
      expect(new FixedDecimal("10.12345678901234", 12).toString()).toBe(
        "10.123456789012",
      );
      expect(new FixedDecimal("-0.123456789", 1).toString()).toBe("-0.1");
      expect(new FixedDecimal("10.001234").toString()).toBe(
        "10.0012340000000000",
      );
      expect(new FixedDecimal("10.1234123412341234").toString()).toBe(
        "10.1234123412341234",
      );
      expect(new FixedDecimal("10.12341234123412341111").toString()).toBe(
        "10.1234123412341234",
      );
      expect(new FixedDecimal("10.00000000000000001111").toString()).toBe(
        "10.0000000000000000",
      );
    });

    it("allows to specify the precision", () => {
      expect(new FixedDecimal("0.987654321").toString(1)).toBe("1.0");
      expect(new FixedDecimal("0.987654321").toString(2)).toBe("0.99");
      expect(new FixedDecimal("0.987654321").toString(3)).toBe("0.988");
      expect(new FixedDecimal("0.987654321").toString(5)).toBe("0.98765");
    });
  });

  describe("toNumber", () => {
    it("returns the number", () => {
      expect(new FixedDecimal("0").toNumber()).toBe(0.0);
      expect(new FixedDecimal("1").toNumber()).toBe(1.0);
      expect(new FixedDecimal("12345678901234567890").toNumber()).toBe(
        12345678901234567890.0,
      );
      expect(new FixedDecimal("0.1234").toNumber()).toBe(0.1234);
      expect(new FixedDecimal("12.34").toNumber()).toBe(12.34);

      expect(new FixedDecimal("0.1234", 6).toNumber()).toBe(0.1234);
      expect(new FixedDecimal("10.12345678901234", 12).toNumber()).toBe(
        10.123456789012,
      );
      expect(new FixedDecimal("-0.123456789", 1).toNumber()).toBe(-0.1);
    });

    it("allows to specify the precision", () => {
      expect(new FixedDecimal("0.987654321").toNumber(1)).toBe(1.0);
      expect(new FixedDecimal("0.987654321").toNumber(2)).toBe(0.99);
      expect(new FixedDecimal("0.987654321").toNumber(3)).toBe(0.988);
      expect(new FixedDecimal("0.987654321").toNumber(5)).toBe(0.98765);
    });
  });

  describe("add", () => {
    it("adds two numbers", () => {
      expect(
        new FixedDecimal("0.1").add(new FixedDecimal("0.2")).toNumber(),
      ).toBe(0.3);
      expect(
        new FixedDecimal("-0.1").add(new FixedDecimal("0.2")).toNumber(),
      ).toBe(0.1);
      expect(
        new FixedDecimal("0.1").add(new FixedDecimal("-0.3")).toNumber(),
      ).toBe(-0.2);
    });

    it("uses the precision of the first number", () => {
      expect(
        new FixedDecimal("0.123456789", 1)
          .add(new FixedDecimal("0.123456789"))
          .toNumber(),
      ).toBe(0.2);
      expect(
        new FixedDecimal("0.123456789", 2)
          .add(new FixedDecimal("0.123456789"))
          .toNumber(),
      ).toBe(0.25);
      expect(
        new FixedDecimal("0.123456789", 4)
          .add(new FixedDecimal("-0.123456789", 1))
          .toNumber(),
      ).toBe(0.0035);
    });

    it("allows to pass a number as a string", () => {
      expect(new FixedDecimal("0.1").add("0.2").toNumber()).toBe(0.3);
      expect(new FixedDecimal("-0.1").add("0.2").toNumber()).toBe(0.1);
    });

    it("allows to pass a number", () => {
      expect(new FixedDecimal(0.1).add(0.2).toNumber()).toBe(0.3);
      expect(new FixedDecimal(-0.1).add(0.2).toNumber()).toBe(0.1);
    });
  });

  describe("sub", () => {
    it("subtracts two numbers", () => {
      expect(
        new FixedDecimal("0.1").sub(new FixedDecimal("0.2")).toNumber(),
      ).toBe(-0.1);
      expect(
        new FixedDecimal("-0.1").sub(new FixedDecimal("0.2")).toNumber(),
      ).toBe(-0.3);
      expect(
        new FixedDecimal("0.1").sub(new FixedDecimal("-0.3")).toNumber(),
      ).toBe(0.4);
    });

    it("uses the precision of the first number", () => {
      expect(
        new FixedDecimal("0.123456789", 1)
          .sub(new FixedDecimal("0.19"))
          .toNumber(),
      ).toBe(-0.1);
      expect(
        new FixedDecimal("0.123456789", 2)
          .sub(new FixedDecimal("0.19"))
          .toNumber(),
      ).toBe(-0.07);
      expect(
        new FixedDecimal("0.123456789", 2)
          .sub(new FixedDecimal("-0.123456789", 1))
          .toNumber(),
      ).toBe(0.24);
    });

    it("allows to pass a number as a string", () => {
      expect(new FixedDecimal("0.1").sub("0.2").toNumber()).toBe(-0.1);
      expect(new FixedDecimal("-0.1").sub("0.2").toNumber()).toBe(-0.3);
    });

    it("allows to pass a number", () => {
      expect(new FixedDecimal(0.1).sub(0.2).toNumber()).toBe(-0.1);
      expect(new FixedDecimal(-0.1).sub(0.2).toNumber()).toBe(-0.3);
    });
  });

  describe("mul", () => {
    it("multiplies two numbers", () => {
      expect(new FixedDecimal("6").mul(new FixedDecimal("2")).toNumber()).toBe(
        12,
      );
      expect(
        new FixedDecimal("0.6").mul(new FixedDecimal("0.2")).toNumber(),
      ).toBe(0.12);
      expect(
        new FixedDecimal("0.06").mul(new FixedDecimal("0.02")).toNumber(),
      ).toBe(0.0012);
      expect(
        new FixedDecimal("6.17283945").mul(new FixedDecimal("0.2")).toNumber(),
      ).toBe(1.23456789);
      expect(
        new FixedDecimal("6.2").mul(new FixedDecimal("-2.1")).toNumber(),
      ).toBe(-13.02);
    });

    it("uses the precision of the first number", () => {
      expect(
        new FixedDecimal("0.123456789", 3)
          .mul(new FixedDecimal("0.123456789"))
          .toNumber(),
      ).toBe(0.015);
      expect(
        new FixedDecimal("0.123456789", 3)
          .mul(new FixedDecimal("-0.123456789", 1))
          .toNumber(),
      ).toBe(-0.015);
    });

    it("allows to pass a number as a string", () => {
      expect(new FixedDecimal("6").mul("2").toNumber()).toBe(12);
      expect(new FixedDecimal("0.6").mul("0.2").toNumber()).toBe(0.12);
    });

    it("allows to pass a number", () => {
      expect(new FixedDecimal(6).mul(2).toNumber()).toBe(12);
      expect(new FixedDecimal(0.6).mul(0.2).toNumber()).toBe(0.12);
    });
  });

  describe("div", () => {
    it("divides two numbers", () => {
      expect(new FixedDecimal("6").div(new FixedDecimal("2")).toNumber()).toBe(
        3,
      );
      expect(
        new FixedDecimal("1.23456789").div(new FixedDecimal("0.2")).toNumber(),
      ).toBe(6.17283945);
      expect(
        new FixedDecimal("6.2").div(new FixedDecimal("-2.1")).toNumber(),
      ).toBe(-2.9523809523809526);
    });

    it("uses the precision of the first number", () => {
      expect(
        new FixedDecimal("0.123456789", 3)
          .div(new FixedDecimal("0.123456789"))
          .toNumber(),
      ).toBe(1);
      expect(
        new FixedDecimal("0.123456789", 3)
          .div(new FixedDecimal("-0.123456789", 1))
          .toNumber(),
      ).toBe(-1.028);
    });

    it("allows to pass a number as a string", () => {
      expect(new FixedDecimal("6").div("2").toNumber()).toBe(3);
      expect(new FixedDecimal("0.6").div("0.2").toNumber()).toBe(3);
    });

    it("allows to pass a number", () => {
      expect(new FixedDecimal(6).div(2).toNumber()).toBe(3);
      expect(new FixedDecimal(0.6).div(0.2).toNumber()).toBe(3);
    });
  });

  describe("mod", () => {
    it("returns the remainder of the division", () => {
      expect(new FixedDecimal("6").mod(new FixedDecimal("2")).toNumber()).toBe(
        0,
      );
      expect(
        new FixedDecimal("6.6").mod(new FixedDecimal("2")).toNumber(),
      ).toBe(0.6);
      expect(
        new FixedDecimal("0.6").mod(new FixedDecimal("2")).toNumber(),
      ).toBe(0.6);
      expect(
        new FixedDecimal("6").mod(new FixedDecimal("0.02")).toNumber(),
      ).toBe(0);
      expect(
        new FixedDecimal("6.003").mod(new FixedDecimal("0.02")).toNumber(),
      ).toBe(0.003);
      expect(new FixedDecimal("6").mod(new FixedDecimal("4")).toNumber()).toBe(
        2,
      );
      expect(new FixedDecimal("6").mod(new FixedDecimal("5")).toNumber()).toBe(
        1,
      );
      expect(
        new FixedDecimal("6").mod(new FixedDecimal("3.5")).toNumber(),
      ).toBe(2.5);
      expect(
        new FixedDecimal("-6").mod(new FixedDecimal("3.1")).toNumber(),
      ).toBe(-2.9);
      expect(new FixedDecimal("6").mod(new FixedDecimal("3")).toNumber()).toBe(
        0,
      );
    });

    it("uses the precision of the first number", () => {
      expect(
        new FixedDecimal("0.123456789", 3)
          .mod(new FixedDecimal("0.123456789"))
          .toNumber(),
      ).toBe(0);
      expect(
        new FixedDecimal("0.123456789", 3)
          .mod(new FixedDecimal("-0.123456789", 1))
          .toNumber(),
      ).toBe(0.003);
    });

    it("allows to pass a number as a string", () => {
      expect(new FixedDecimal("6").mod("2").toNumber()).toBe(0);
      expect(new FixedDecimal("6.6").mod("2").toNumber()).toBe(0.6);
    });

    it("allows to pass a number", () => {
      expect(new FixedDecimal(6).mod(2).toNumber()).toBe(0);
      expect(new FixedDecimal(6.6).mod(2).toNumber()).toBe(0.6);
    });
  });

  describe("withPrecision", () => {
    it("changes the precision", () => {
      expect(
        new FixedDecimal("0.123456789", 5).withPrecision(3).toNumber(),
      ).toBe(0.123);
      expect(
        new FixedDecimal("0.123456789", 2).withPrecision(3).toNumber(),
      ).toBe(0.123);
      expect(
        new FixedDecimal("-0.123456789", 2).withPrecision(3).toNumber(),
      ).toBe(-0.123);
    });

    it("rounds the number", () => {
      expect(new FixedDecimal("0.123456789").withPrecision(5).toNumber()).toBe(
        0.12346,
      );
      expect(new FixedDecimal("0.123456789").withPrecision(6).toNumber()).toBe(
        0.123457,
      );
    });
  });
});
