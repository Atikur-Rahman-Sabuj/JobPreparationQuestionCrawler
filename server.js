const request = require("request");
const cheerio = require("cheerio");
const mongoose = require("fs");
const { type } = require("os");
const SAVE_URL = "https://jobprepbd.herokuapp.com/api/question";
const URL = "https://mcqstudybd.com/40th-bcs-preliminary-question-with-answer.php";
const CHAPTER_ID = "5f453a210e23a626b8e06e9e";
const START_INDEX = 176;
const END_INDEX = 176;
let requestCount = 0;
request(URL, function (err, res, body) {
   if (err) {
      console.log(err, "error occurred while hitting URL");
   } else {
      let $ = cheerio.load(body);
      //#region single question
      //   let fullQuestion = $(`#q1 legend`).text();
      //   let mindex = fullQuestion.split(".")[0];
      //   let question = fullQuestion.slice(mindex.length + 1).trim();
      //   let options = [];
      //   $(`#q1 .radio`).each((i, e) => {
      //      options.push({ value: $(e).text().trim() });
      //   });

      //   let mbody = {
      //      chapters: ["5f5145ffab55f1001e3869e2"],
      //      index: mindex,
      //      options: options,
      //      question: question,
      //   };
      //   console.log(mbody);
      //   request.post(
      //      {
      //         url: SAVE_URL,
      //         json: true,
      //         body: mbody,
      //         headers: {
      //            Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYjdmNDU0OWJkOTM4MzgxMTMzM2MiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiU2FidWoiLCJleHAiOjE2MDQ0OTIyNTIuNDA2LCJpYXQiOjE1OTkzMDgyNTJ9.dC0w6RRBYBLP9Hc6KNszDGvrqdomUVtrdYfJ-NLklyM`,
      //         },
      //      },
      //      (err2, res2, body2) => {
      //         if (err2) {
      //            console.log("Error: " + err2);
      //         } else {
      //            console.log(res2.body);
      //         }
      //      }
      //   );
      //#region

      for (let index = START_INDEX; index <= END_INDEX; index++) {
         let fullQuestion = $(`#q${index} legend`).text();
         let mindex = fullQuestion.split(".")[0];
         let question = fullQuestion.slice(mindex.length + 1).trim();
         let options = [];
         $(`#q${index} .radio`).each((i, e) => {
            options.push({ value: $(e).text().trim() });
         });

         let body = {
            chapters: [CHAPTER_ID],
            index: mindex,
            options: options,
            question: question,
         };
         request.post(
            {
               url: SAVE_URL,
               json: true,
               timeout: 30000,
               body: body,
               headers: {
                  Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjNlYjdmNDU0OWJkOTM4MzgxMTMzM2MiLCJyb2xlIjoiYWRtaW4iLCJuYW1lIjoiU2FidWoiLCJleHAiOjE2MDU2NDMxODAuMzIzLCJpYXQiOjE2MDA0NTkxODB9.dz4XiWReiseg1ntoesuoFbCKBRV4UHH5LOumU-2JCh4`,
               },
            },
            (err2, res2, body2) => {
               if (err2) {
                  console.log(++requestCount + `: Error on ${index}: ` + err2);
               } else {
                  console.log(++requestCount + `: Completed no: ${index}`);
               }
            }
         );
      }
   }
});
//request(URL, { body });
