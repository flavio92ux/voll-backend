const utc_time = moment.utc().local().format('DD-MM-YYYY HH:mm');
const local_time =  moment(utc_time, 'DD-MM-YYYY HH:mm').subtract("+02:00").format('DD-MM-YYYY HH:mm');
console.log(utc_time)
console.log(local_time)