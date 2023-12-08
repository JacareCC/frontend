import moment from "moment";

export default function CalculateTimeDifference(visitDate: moment.MomentInput) {
    const now = moment();
    const visitMoment = moment(visitDate);
    const diffInMinutes = now.diff(visitMoment, "minutes");
    const diffInHours = now.diff(visitMoment, "hours");
    const diffInDays = now.diff(visitMoment, "days");

    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      return `${diffInDays} days ago`;
    }
  }