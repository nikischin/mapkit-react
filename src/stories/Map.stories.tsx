import React, { useId, useState } from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import './stories.css';

import Map from '../components/Map';
import {
  ColorScheme, MapType, Distances, LoadPriority,
} from '../util/parameters';

const token = process.env.STORYBOOK_MAPKIT_JS_TOKEN!;

const enumArgType = (e: object) => ({
  options: Object.values(e).filter((val) => typeof val === 'number'),
  control: {
    type: 'inline-radio',
    labels: Object.values(e).filter((val) => typeof val === 'string'),
  },
});
export default {
  title: 'Components/Map',
  component: Map,
  args: { token },
  argTypes: {
    colorScheme: enumArgType(ColorScheme),
    mapType: enumArgType(MapType),
    distances: enumArgType(Distances),
    loadPriority: enumArgType(LoadPriority),
  },
  parameters: { layout: 'fullscreen' },
} as ComponentMeta<typeof Map>;

type MapProps = React.ComponentProps<typeof Map>;

const Template: Story<MapProps> = (args) => <Map {...args} />;

export const Empty = Template.bind({});

export const CustomizedAppearance = Template.bind({});
CustomizedAppearance.args = {
  colorScheme: ColorScheme.Dark,
  mapType: MapType.MutedStandard,
  showsMapTypeControl: false,
  showsUserLocationControl: true,
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 32,
  paddingBottom: 32,
};

export const RegionLock = Template.bind({});
RegionLock.args = {
  cameraBoundary: {
    centerLatitude: 40.444,
    centerLongitude: -79.945,
    latitudeDelta: 0.006,
    longitudeDelta: 0.008,
  },
  minCameraDistance: 100,
  maxCameraDistance: 1000,
};

export const LiveStateUpdate: Story<MapProps> = (args) => {
  const [theme, setTheme] = useState(ColorScheme.Light);

  const options: { name: string, value: ColorScheme, id: string }[] = [
    { name: 'Light', value: ColorScheme.Light, id: useId() },
    { name: 'Dark', value: ColorScheme.Dark, id: useId() },
  ];

  return (
    <>
      <Map {...args} colorScheme={theme} />

      <div className="map-overlay">
        <div className="map-overlay-box">
          {options.map((option) => (
            <label htmlFor={option.id}>
              <input
                id={option.id}
                type="radio"
                name="theme"
                value={option.value}
                onChange={() => setTheme(option.value)}
                checked={theme === option.value}
              />
              {option.name}
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
LiveStateUpdate.args = {
  paddingBottom: 44,
};
