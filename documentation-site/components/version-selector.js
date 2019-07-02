/*
Copyright (c) 2018-2019 Uber Technologies, Inc.

This source code is licensed under the MIT license found in the
LICENSE file in the root directory of this source tree.
*/

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env browser */

import * as React from 'react';

import ChevronDown from 'baseui/icon/chevron-down';
import {StatefulPopover, PLACEMENT as PopoverPlacement} from 'baseui/popover';
import {StatefulMenu} from 'baseui/menu';
import {Button, KIND} from 'baseui/button';

import {version} from '../../package.json';
import versions from '../../versions.json';

const MAJOR_VERSIONS = [
  {label: 'v8'},
  {label: 'v7'},
  {label: 'v6'},
  {label: 'v5'},
  {label: 'v4'},
  {label: 'v3'},
  {label: 'v2'},
  {label: 'v1'},
];

const VersionSelector = () => {
  const versionsToShow = versions
    .filter(releaseVersion => {
      // we have now deployments since this date
      return (
        new Date(releaseVersion.published_at) > new Date('2019-07-01T10:57:35Z')
      );
    })
    .map(item => {
      return {
        label: item.name,
        commit: item.target_commitish,
      };
    });

  return (
    <StatefulPopover
      placement={PopoverPlacement.bottomLeft}
      content={({close}) => (
        <StatefulMenu
          items={MAJOR_VERSIONS}
          onItemSelect={({item}) => {
            window.open(`https://${item.label}.baseweb.design`);
            close();
          }}
          overrides={{
            List: {
              style: {
                width: '84px',
              },
            },
            Option: {
              props: {
                size: 'compact',
                getChildMenu: item => {
                  if (item.label === 'v8') {
                    return (
                      <StatefulMenu
                        size="compact"
                        items={versionsToShow}
                        onItemSelect={({item}) => {
                          console.log('onItemSelect', item);
                          window.open(`https://${item.commit}-baseweb.now.sh`);
                          close();
                        }}
                        overrides={{
                          List: {style: {width: '200px'}},
                          Option: {props: {size: 'compact'}},
                        }}
                      />
                    );
                  }
                },
              },
            },
          }}
        />
      )}
    >
      <Button
        size="compact"
        kind={KIND.minimal}
        endEnhancer={() => <ChevronDown size={20} />}
      >
        v{version}
      </Button>
    </StatefulPopover>
  );
};

export default VersionSelector;
