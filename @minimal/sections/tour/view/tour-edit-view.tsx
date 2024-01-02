// @mui
import Container from '@mui/material/Container';
// routes
import { paths } from '@minimal/routes/paths';
// _mock
import { _tours } from '@minimal/_mock';
// components
import { useSettingsContext } from '@minimal/components/settings';
import CustomBreadcrumbs from '@minimal/components/custom-breadcrumbs';
//
import TourNewEditForm from '../tour-new-edit-form';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function TourEditView({ id }: Props) {
  const settings = useSettingsContext();

  const currentTour = _tours.find((tour) => tour.id === id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Tour',
            href: paths.dashboard.tour.root,
          },
          { name: currentTour?.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <TourNewEditForm currentTour={currentTour} />
    </Container>
  );
}
