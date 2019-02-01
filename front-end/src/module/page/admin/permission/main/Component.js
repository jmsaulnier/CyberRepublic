import React from 'react'
import _ from 'lodash'
import MediaQuery from 'react-responsive'
import {
  Col, Row, Spin, Tabs,
} from 'antd'
import I18N from '@/I18N'
import AdminPage from '../../BaseAdmin'
import Footer from '@/module/layout/Footer/Container'
import Navigator from '@/module/page/shared/HomeNavigator/Container'
import List from '../list/Container'
import {
  USER_ROLE,
} from '@/constant'

import '@/module/page/admin/admin.scss'
import './style.scss'

const TabPane = Tabs.TabPane

export default class extends AdminPage {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    super.componentDidMount()

    this.refetch()
  }

  componentWillUnmount() {
    this.props.resetAll()
  }

  ord_renderContent() {
    const { dataList, loading, loadingForRole, currentUserId } = this.props;
    const loadingNode = <div className="center"><Spin size="large" /></div>
    let listNode = loading || loadingForRole ? loadingNode : this.renderTabs()

    if (_.isEmpty(dataList) && !loading || !currentUserId) {
      listNode = <div className="center">{I18N.get('suggestion.nodata')}</div>
    }

    const headerNode = this.renderHeader()
    return (
      <div>
        <div className="p_AdminPermissionList">
          <Row>
            <Col sm={24} md={4} className="wrap-box-navigator">
              <Navigator selectedItem="profileAdminPermissions" />
            </Col>
            <Col sm={24} md={20} className="c_ProfileContainer admin-right-column wrap-box-user">
              {headerNode}
              {listNode}
            </Col>
          </Row>
        </div>
        <Footer />
      </div>
    )
  }

  callback(key) {
    console.log(key);
  }

  renderTabs() {
    const roles = _.values(USER_ROLE)
    const { dataList } = this.props
    const accuData = _.reduce(dataList, (prev, curr) => {
      if (!_.isEmpty(prev[curr.resourceType])) {
        prev[curr.resourceType].push(curr)
        return prev
      }
      return _.extend(prev, { [curr.resourceType]: [curr] })
    }, {})
    const panes = _.map(roles, role => <TabPane tab={role} key={role}>{this.renderList(role, accuData)}</TabPane>)
    return (
      <Tabs defaultActiveKey={roles[0]} onChange={this.callback}>
        {panes}
      </Tabs>
    )
  }

  getDataList = (resourceType) => {
    const { dataList } = this.props
    return _.filter(dataList, data => data.resourceType === resourceType)
  }

  getDataListForRole = (resourceType, role) => {
    const { dataListForRole } = this.props
    return _.filter(dataListForRole, data => data.resourceType === resourceType && data.role === role)
  }

  renderList(role, accuData) {
    console.log(accuData)
    const nodes = _.map(accuData, (dataList, resourceType) => {
      const dataListForRole = this.getDataListForRole(resourceType, role)
      console.log('dataListForRole: ', dataListForRole)
      const props = {
        dataList,
        dataListForRole,
        role,
        header: resourceType,
        key: resourceType,
      }
      return <List {...props} />
    })

    return (
      <div>
        {nodes}
      </div>
    )
  }

  renderHeader() {
    return (
      <h2 className="title komu-a cr-title-with-icon">{this.props.header || I18N.get('suggestion.title').toUpperCase()}</h2>
    )
  }


  /**
   * Builds the query from the current state
   */
  getQuery = () => {
    const { role, resourceType } = this.props
    const query = {
      role,
      resourceType,
    }

    return query
  }

  /**
   * Refetch the data based on the current state retrieved from getQuery
   */
  refetch = () => {
    const query = this.getQuery()
    this.props.getList()
    this.props.getListForRole()
  }
}
