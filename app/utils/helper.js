import moment from "moment";
import { Platform } from 'react-native';

//for email validation
export const validateEmail = (email) => {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return regex.test(email);
}

export const getInitials = (name) => {
   if (!name) return "";

   const words = name.split("");
   let initial = "";

   for (let i = 0; i < Math.min(words.length, 2); i++) {
      initial += words[i][0];
   }

   return initial.toUpperCase();
}

export const addThousandsSeparator = (num) => {
   if (num === null || isNaN(num)) return "";

   const [integerPart, fractionalPart] = num.toString().split(".")
   const formatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

   return fractionalPart ? `${formatedInteger}.${fractionalPart}` : formatedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
   const chartData = data.map((item) => ({
      category: item.category,
      amount: item.amount
   }))

   return chartData;
}

export const prepareIncomeBarChartData = (data = []) => {
   const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

   const chartData = sortedData.map((item) => ({
      month: moment(item?.date).format("Do MMM"),
      amount: item?.amount,
      source: item?.source
   }))

   return chartData;
}

export const prepareExpenseLineChartData=(data=[])=>{
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

   const chartData = sortedData.map((item) => ({
      month: moment(item?.date).format("Do MMM"),
      amount: item?.amount,
      category: item?.category
   }))

   return chartData;
}



export const getFixedImageUrl = (url) => {
  if (!url) return null;

  // Replace localhost with proper host for each platform
  if (url.includes('localhost')) {
   //  if (Platform.OS === 'android') {
   //    // Android emulator uses 10.0.2.2 to access host
   //    return url.replace('localhost', '10.0.2.2');
   //  } else if (Platform.OS === 'ios') {
   //    // iOS simulator can use 127.0.0.1
   //    return url.replace('localhost', '127.0.0.1');
   //  } else {
      // Physical devices — use your LAN IP instead
      return url.replace('localhost', '192.168.29.225'); // replace with your PC IP
   //  }
  }

  return url;
};