import React from 'react';

import { Remarkable } from 'remarkable';
import parse from 'html-react-parser';
// import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const md = new Remarkable('full', {
  html: true,
  xhtmlOut: true,
  //typographer: true
});

export default function MarkdownRenderer({ text }) {

  return (
    <Container>
      {parse(md.render(text))}
    </Container>
  )
}