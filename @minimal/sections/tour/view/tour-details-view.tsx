import { useState, useCallback } from 'react';
// @mui
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
// routes
import { paths } from '@minimal/routes/paths';
// _mock
import { _tours, TOUR_PUBLISH_OPTIONS, TOUR_DETAILS_TABS } from '@minimal/_mock';
// components
import Label from '@minimal/components/label';
import { useSettingsContext } from '@minimal/components/settings';
//
import TourDetailsToolbar from '../tour-details-toolbar';
import TourDetailsContent from '../tour-details-content';
import TourDetailsBookers from '../tour-details-bookers';

// ----------------------------------------------------------------------

type Props = {
  id: string;
};

export default function TourDetailsView({ id }: Props) {
  const settings = useSettingsContext();

  const currentTour = _tours.filter((tour) => tour.id === id)[0];

  const [publish, setPublish] = useState(currentTour?.publish);

  const [currentTab, setCurrentTab] = useState('content');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangePublish = useCallback((newValue: string) => {
    setPublish(newValue);
  }, []);

  const renderTabs = (
    <Tabs
      value={currentTab}
      onChange={handleChangeTab}
      sx={{
        mb: { xs: 3, md: 5 },
      }}
    >
      {TOUR_DETAILS_TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            tab.value === 'bookers' ? (
              <Label variant="filled">{currentTour?.bookers.length}</Label>
            ) : (
              ''
            )
          }
        />
      ))}
    </Tabs>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TourDetailsToolbar
        backLink={paths.dashboard.tour.root}
        editLink={paths.dashboard.tour.edit(`${currentTour?.id}`)}
        liveLink="#"
        publish={publish || ''}
        onChangePublish={handleChangePublish}
        publishOptions={TOUR_PUBLISH_OPTIONS}
      />
      {renderTabs}

      {currentTab === 'content' && <TourDetailsContent tour={currentTour} />}

      {currentTab === 'bookers' && <TourDetailsBookers bookers={currentTour?.bookers} />}
    </Container>
  );
}
