import { useGetAssigneeTasks } from '../../hooks/useGetAssigneeTasks';
import { useGetHistoryByU } from '../../hooks/useGetHistoryByU'
import { DoughnutChart } from '../DoughnutChart'
import { IncidentsSummaryEmployee } from '../summaries/IncidentsSummaryEmployee';

export const EmployeeProfile = ({member, closeMemberProfile}) => {

  const { tasksByAssignee, setTasksByAssignee, isLoading} = useGetAssigneeTasks(member.id)
  const { historyByAssignee, setHistoryByAssignee , isLoadingH } = useGetHistoryByU(member.id)

  const filterChange = (filterData, historyFilterData) => {

    setTasksByAssignee(filterData)
    setHistoryByAssignee(historyFilterData)
    
  }

  const labelsForGraph = Object.keys(tasksByAssignee);
  labelsForGraph.push('total_closed_history')

  const valuesForGraph = Object.values(tasksByAssignee);
  valuesForGraph.push(historyByAssignee.totalClosedH)

  const data = {
      labels: labelsForGraph,
      datasets: [
        {
          data: valuesForGraph,
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(201, 208, 70)',
          ],
          borderColor: [
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
            'rgba(0, 0, 0, 1)',
          ],
          borderWidth: 1,
          hoverOffset: 10,
        },
      ]};

  return (

    <section className="employee-profile-section">
        <div className="profile-container">

            <div className="member-item member-profile-header">
                <figure className="member-initials" style={{backgroundColor: member.color}}>{member.initials}</figure>
                <h4>{member.username}<br/><span>Incidents - Info</span><br/></h4>
                <button onClick={closeMemberProfile} className='btn-close'>X</button>
            </div>

            <div className='graph-in-profile'>
              {isLoading ? <h4>Loading...</h4> : <DoughnutChart data={data}/>}
            </div>

            <IncidentsSummaryEmployee 
              filterChange={filterChange} 
              incidentsOpen={tasksByAssignee.total_incidents_open} 
              incidentsClosed={tasksByAssignee.total_incidents_closed}
              incidentsClosedByH={historyByAssignee}
              memberId={member.id}
            /> 

        </div>
    </section>

  )
}
