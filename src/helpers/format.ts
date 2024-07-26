
export const formatDate = (inputDate: Date | string | null) => {
    if (!inputDate || inputDate === "") {
        return "n/a"
    }
    const date = new Date(inputDate);
    const formattedDate = date.toLocaleDateString("en-US", {
        year: "2-digit",
        month: "2-digit",
        day: "2-digit"
    });
    const [month, day, year] = formattedDate.split("/");
    const finalFormattedDate = `${day}-${month}-${year}`;
    return finalFormattedDate
}