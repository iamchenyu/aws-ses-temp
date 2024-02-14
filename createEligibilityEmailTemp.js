const AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: "us-east-1" });

const fs = require("fs");

const htmlContent = fs.readFileSync(
  "./templates/checkEligibilityTemplate.html",
  "utf8"
);
const txtContent = fs.readFileSync(
  "./templates/checkEligibilityTemplate.txt",
  "utf8"
);

const params = {
  Template: {
    TemplateName: "checkEligibilityTemplate",
    SubjectPart: "Notification - Eligibility Inquiry",
    HtmlPart: htmlContent, // Include HTML content read from the file
    TextPart: txtContent, // Include text content read from the file
  },
};

// Create the promise and SES service object
const templatePromise = new AWS.SES({ apiVersion: "2010-12-01" })
  .createTemplate(params)
  .promise();

// Handle promise's fulfilled/rejected states
templatePromise
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.error(err, err.stack);
  });
