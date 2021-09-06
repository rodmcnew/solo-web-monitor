import React from 'react';
import { useSelector } from 'react-redux';
import { DetailsUiMode } from '../../types';
import { getDetailsUiMode } from './monitorsSlice';
import { MonitorList } from './sidebar/MonitorList';
import { useSelectedMonitor } from './monitor/useSelectedMonitor';
import { CreateMonitorPage } from './monitor/CreateMonitorPage';
import { DeleteMonitorConfirmPage } from './monitor/DeleteMonitorConfirmPage';
import { EditMonitorPage } from './monitor/EditMonitorPage';
import { ViewMonitorDetailsPage } from './monitor/ViewMonitorDetailsPage';

export function Monitors() {
  const detailsUiMode = useSelector(getDetailsUiMode);
  const { monitor } = useSelectedMonitor();

  return <div>
    <div className="row">
      <div className="col-lg-12 col-xl-4">
        <MonitorList />
      </div>
      <div className="col-lg-12 col-xl-8">
        {detailsUiMode === DetailsUiMode.Create &&
          <CreateMonitorPage />
        }
        {monitor &&
          <>
            {detailsUiMode === DetailsUiMode.View &&
              <ViewMonitorDetailsPage monitor={monitor} />
            }
            {detailsUiMode === DetailsUiMode.Edit &&
              <EditMonitorPage monitor={monitor} />
            }
            {detailsUiMode === DetailsUiMode.Delete &&
              <DeleteMonitorConfirmPage monitor={monitor} />
            }
          </>
        }
      </div>
    </div>
  </div>
}
