import React from "react"
import { useAsync } from "../../hooks"
import {
  PageMain,
  Navbar,
  PageContent,
  List,
  BasicCard,
} from "../../components"
import { ALL_MEASURES } from "../measures/measures"
import { allTasks, latestRuns } from "../../api"

export const UserDashbooardPage = () => {
  const { data, type, reload, refresh } = useAsync(latestRuns)
  const other = useAsync(allTasks)
  return (
    <PageMain>
      <Navbar title="Main" />
      <PageContent>
        <BasicCard title="Possible Measures">
          <List elements={ALL_MEASURES} />
        </BasicCard>
      </PageContent>
    </PageMain>
  )
}
