// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@minimal/routes/paths';
// components
import { useSettingsContext } from '@minimal/components/settings';
import CustomBreadcrumbs from '@minimal/components/custom-breadcrumbs';
//
import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Create a new job"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Job',
            href: paths.dashboard.job.root,
          },
          { name: 'New job' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm />
    </Container>
  );
}