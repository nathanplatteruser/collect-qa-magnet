/* Synthetic validation-notice samples — fiction only; intentional gaps for demo. */
window.COLLECT_QA_SAMPLE = `NORTHBRIDGE RECOVERY GROUP
(This letter is synthetic demo content. Not a real collection.)

January 12, 2026

Alex Rivera
442 Maple Court
Springfield, ST 00000

Re: Account

Dear Alex Rivera:

This is an attempt to collect a debt. Any information obtained will be used for that purpose.

We are collecting a consumer debt. The current creditor is Harbor Card Services.

Amount due: $1,284.50

Please contact us to discuss payment options.

If you dispute this debt, write to us.

Sincerely,
Northbridge Recovery Group
Collections Department
`;

window.COLLECT_QA_DESK = [
  {
    id: "thin",
    docket: "NB-1041",
    label: "Thin draft — expect REFUSE",
    hint: "Almost no validation facts. Desk should refuse, not invent.",
    text: "Please remit the balance owed.\nCall us to discuss payment.\n",
  },
  {
    id: "gappy",
    docket: "NB-1042",
    label: "Harbor Card — gappy sample",
    hint: "Same synthetic letter as the magnet pack. Gaps + weak cites.",
    text: window.COLLECT_QA_SAMPLE,
  },
  {
    id: "itemization",
    docket: "NB-1043",
    label: "Metro Retail — itemization hole",
    hint: "Some collector signals; itemization table / date still missing.",
    text: `NORTHBRIDGE RECOVERY GROUP
(This letter is synthetic demo content. Not a real collection.)

March 3, 2026

Jordan Hale
123 Oak Street
Springfield, ST 00000

Re: Account number XXXX-4412

Dear Jordan Hale:

This is a communication from a debt collector. This is an attempt to collect a debt. Any information obtained will be used for that purpose.

The current creditor is Metro Retail Bank. Amount now due: $640.00.

If you dispute this debt, write to us at our mailing address: P.O. Box 9100, Springfield, ST 00000.

For more information: www.cfpb.gov/debt-collection

Sincerely,
Northbridge Recovery Group
`,
  },
];
