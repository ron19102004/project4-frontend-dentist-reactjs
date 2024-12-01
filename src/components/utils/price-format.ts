const formatCurrency = (amount: number): string => {
    return `${amount.toLocaleString("vi-VN")}K VND`;
};
export default formatCurrency