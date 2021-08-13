import React from 'react';
import { useSelector } from 'react-redux';
import { DetailsUiMode } from '../../types';
import { getDetailsUiMode } from '../dashboard/dashboardSlice';
import { MonitorList } from '../monitor-sidebar/MonitorList';
import { useSelectedMonitor } from '../monitor/useSelectedMonitor';
import { CreateMonitorPage } from '../monitor-pages/CreateMonitorPage';
import { DeleteMonitorConfirmPage } from '../monitor-pages/DeleteMonitorConfirmPage';
import { EditMonitorPage } from '../monitor-pages/EditMonitorPage';
import { ViewMonitorDetailsPage } from '../monitor-pages/ViewMonitorDetailsPage';

export function MonitorDashboard() {
  const detailsUiMode = useSelector(getDetailsUiMode);
  const { monitor } = useSelectedMonitor(); //@TODO what if this is loading or has error?

  return <div>
    <div className="row">
      <div className="col-lg-12 col-xl-4">
        <MonitorList />
      </div>
      <div className="col-lg-12 col-xl-8">
        {detailsUiMode === DetailsUiMode.Create &&
          <CreateMonitorPage />
        }
        {detailsUiMode === DetailsUiMode.View && monitor &&
          <ViewMonitorDetailsPage monitor={monitor} />
        }
        {detailsUiMode === DetailsUiMode.Edit && monitor &&
          <EditMonitorPage monitor={monitor} />
        }
        {detailsUiMode === DetailsUiMode.Delete && monitor &&
          <DeleteMonitorConfirmPage monitor={monitor} />
        }
      </div>
    </div>
  </div>
}
