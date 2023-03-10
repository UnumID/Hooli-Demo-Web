import { Box, Button, Dialog, Fade, IconButton, Link } from '@mui/material';
import { theme } from '~/styles/theme';
import { Form, useNavigate } from '@remix-run/react';
import CloseIcon from '@mui/icons-material/Close';
import MaybeLaterButton from './IDDialog/MaybeLaterButton';
import FormattedTypography from './FormattedTypography';

interface IDDialogProps {
  issueCredsStatus: 'new' | 'success' | 'error';
}

/**
 * Component to pop-up and prompt user on issuing an Unum ID card. Also handles notification of successful or failed issuance.
 */
export default ({ issueCredsStatus }: IDDialogProps) => {
  const { primary, neutral } = theme.palette;
  const navigate = useNavigate();

  // Helper function to close the dialog and remove query params
  const handleClick = () => {
    navigate('/');
  };

  return (
    <Dialog
      open
      slotProps={{
        backdrop: { sx: { background: 'rgba(255, 255, 255, 0.1)' } },
      }}
      PaperProps={{
        style: { borderRadius: 16 },
      }}
      sx={{
        backgroundImage: `linear-gradient(to top, ${neutral.light} 40%, ${primary.main})`,
      }}
    >
      <Fade in timeout={350}>
        <Box
          component='div'
          display='flex'
          flexDirection='column'
          alignItems='center'
          maxWidth='23rem'
          position='relative'
          sx={{
            pt: '1.65rem',
            pb: '2.65rem',
            px: '2.5rem',
          }}
        >
          {issueCredsStatus !== 'new' ? (
            <IconButton
              aria-label='close'
              onClick={handleClick}
              size='small'
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                width: 30,
                height: 30,
                fontSize: '2rem',
              }}
            >
              <CloseIcon fontSize='inherit' />
            </IconButton>
          ) : (
            []
          )}
          <FormattedTypography variant='h3' color='primary'>
            {issueCredsStatus.toUpperCase()}
          </FormattedTypography>
          <FormattedTypography
            variant='h2'
            color='primary.dark'
            sx={{ mb: issueCredsStatus === 'success' ? 4 : 0 }}
          >
            {issueCredsStatus === 'success'
              ? 'Congratulations! Your Hooli ID card is activated.'
              : issueCredsStatus === 'new'
              ? 'Get your Hooli digital ID card. \n Free forever.'
              : 'We encountered an error while issuing your Unum ID. Please try again later'}
          </FormattedTypography>
          {issueCredsStatus !== 'new'
            ? []
            : [
                <FormattedTypography
                  variant='subtitle2'
                  color='neutral.main'
                  key='description-dialog'
                >
                  Use it to 1-click verify your identity. No more forms. No more
                  hassle <em>Welcome to a faster future.</em>
                </FormattedTypography>,
                <FormattedTypography
                  variant='caption'
                  color='neutral.main'
                  sx={{ px: '0.8rem', fontFamily: 'Lato' }}
                  key='legal-links-dialog'
                >
                  By clicking the button below, you agree to our{' '}
                  <Link
                    href='https://unumid.co/legal/terms-of-use'
                    color='secondary.main'
                  >
                    Terms of Use
                  </Link>{' '}
                  and direct Hooli to share your personal information with Unum
                  ID to provide its digital ID card services, in accordance with
                  its{' '}
                  <Link
                    href='https://unumid.co/legal/privacy-policy'
                    color='secondary.main'
                  >
                    {' '}
                    Privacy Policy
                  </Link>
                  .
                </FormattedTypography>,
                <Form method='post' key='activate-button-dailog-new'>
                  <Button
                    name='intent'
                    value='activate1Click'
                    type='submit'
                    sx={{
                      mt: 1,
                      width: 241.25,
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    <img
                      width={241.25}
                      src='/activate_button_with_powered_by_(Hooli).png'
                    />
                  </Button>
                </Form>,
                <MaybeLaterButton
                  key='maybe-later-button-dialog'
                  handleClick={handleClick}
                />,
              ]}
          {(issueCredsStatus === 'success' || issueCredsStatus === 'new') && (
            <img
              src='/id-card-hooli.png'
              width={225}
              style={{
                filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.5))',
                backgroundColor: 'none',
              }}
            />
          )}
        </Box>
      </Fade>
    </Dialog>
  );
};
