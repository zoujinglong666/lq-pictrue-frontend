// PictureReviewStatusEnum.ts

type Option = {
    value: number;
    label: string;
};

interface PictureReviewStatusEnumType {
    REVIEWING: Option;
    PASS: Option;
    REJECT: Option;

    getLabel(value: number): string | null;
    getColor(value: number): string;
    getValue(label: string): number | null;
    getOptionByValue(value: number): Option | undefined;
    getOptionByLabel(label: string): Option | undefined;
    options: Option[];
}

const colorMap: Record<number, string> = {
    0: 'orange',  // "待审核"
    1: 'green',   // "通过"
    2: 'red'      // "拒绝"
};

const PictureReviewStatusEnum: PictureReviewStatusEnumType = {
    REVIEWING: { value: 0, label: "待审核" },
    PASS: { value: 1, label: "通过" },
    REJECT: { value: 2, label: "拒绝" },

    // Get label by value
    getLabel(value: number): string | null {
        const item = this.getOptionByValue(value);
        return item ? item.label : null;
    },

    // Get value by label
    getValue(label: string): number | null {
        const item = this.getOptionByLabel(label);
        return item ? item.value : null;
    },

    // Get option by value
    getOptionByValue(value: number): Option | undefined {
        return Object.values(this).find((option) => option.value === value);
    },

    // Get option by label
    getOptionByLabel(label: string): Option | undefined {
        return Object.values(this).find((option) => option.label === label);
    },

    // Get color based on value
    getColor(value: number): string {
        return colorMap[value] || '';  // Default to empty string if value is not found
    },

    // Options for dropdowns
    options: [
        { value: 0, label: "待审核" },
        { value: 1, label: "通过" },
        { value: 2, label: "拒绝" },
    ],
};

export { PictureReviewStatusEnum };
