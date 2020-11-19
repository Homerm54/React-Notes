import React from 'react';

import ReactMarkdown from 'react-markdown';

import Typography from '@material-ui/core/Typography';


export default function MarkdownRenderer({ text }) {

  return (
    <Typography>
      <ReactMarkdown>{text}</ReactMarkdown>
    </Typography>
  )
}