import Box from '@mui/material/Box';
import type { PropsWithChildren } from 'react';
import TopAppBar from './components/TopAppBar';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Box minHeight='100vh'>
      <TopAppBar />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>{children}</Box>
    </Box>
  );
}
