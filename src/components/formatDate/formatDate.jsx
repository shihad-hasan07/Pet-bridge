function formatDate(dateTimeString, datestring) {
    const dateObject = new Date(dateTimeString || datestring);

    const day = dateObject.getDate();
    const month = dateObject.toLocaleString('default', { month: 'short' });
    const year = dateObject.getFullYear();
    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    let date = ""

    if (dateTimeString !== "") {
        date = `${hours}.${minutes} ${ampm} / ${day} ${month} ${year}`
    }
    else {
        date = `${day} ${month} ${year}`
    }

    return date;
}
export default formatDate;