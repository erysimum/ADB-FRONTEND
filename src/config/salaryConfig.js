export const max = (salaryType) => {
  switch (salaryType) {
    case "annually":
      return 200000;
    case "monthly":
      return 20000;
    case "weekly":
      return 5000;
    case "daily":
      return 800;
    case "hourly":
      return 200;
    default:
      return 200000;
  }
};

export const step = (salaryType) => {
  switch (salaryType) {
    case "annually":
      return 1000;
    case "monthly":
      return 100;
    case "weekly":
      return 10;
    case "daily":
      return 5;
    case "hourly":
      return 0.5;
    default:
      return 0.5;
  }
};

export const marks = (salaryType) => {
  switch (salaryType) {
    case "annually":
      return {
        0: "$0",
        20000: "20K",
        40000: "40K",
        60000: "60K",
        80000: "80K",
        100000: "100K",
        120000: "120K",
        140000: "140K",
        160000: "160K",
        180000: "180K",
        200000: "200K",
      };
    case "monthly":
      return {
        0: "$0",
        2000: "2K",
        4000: "4K",
        6000: "6K",
        8000: "8K",
        10000: "10K",
        12000: "12K",
        14000: "14K",
        16000: "16K",
        18000: "18K",
        20000: "20K",
      };
    case "weekly":
      return {
        0: "$0",
        500: "500",
        1000: "1K",
        1500: "1.5K",
        2000: "2K",
        2500: "2.5K",
        3000: "3K",
        3500: "3.5K",
        4000: "4K",
        4500: "4.5K",
        5000: "5K",
      };
    case "daily":
      return {
        0: "$0",
        100: "100",
        200: "200",
        300: "300",
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      };
    case "hourly":
      return {
        0: "$0",
        20: "20",
        40: "40",
        60: "60",
        80: "80",
        100: "100",
        120: "120",
        140: "140",
        160: "160",
        180: "180",
        200: "200",
      };
    default:
      return 200000;
  }
};
