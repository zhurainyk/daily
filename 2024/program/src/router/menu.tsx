import { Menu, ActionAuthority } from '../module.ts/menu'

export const menuPrarent = {
  // systemData:new Menu({
  //     id:"1",
  //     name:"系统管理",
  //     path:"/",
  //     icon:"",
  //     parentId:"-1",
  //     description:"系统管理"
  // }),
  Kown: new Menu({
    id: ['menu0405', 'menu0215'],
    name: 'Kown',
    path: '/',
    icon: 'kown-img',
    parentId: '-1',
    description: '电梯知识库'
  }),
  UserCompany: new Menu({
    id: 'menu0104',
    name: 'UserCompany',
    path: '/',
    icon: 'iconfont icon-tuanduiguanli2',
    parentId: '-1',
    description: '用户管理'
  }),
  // UserManagement: new Menu({
  //   id: 'menu0403',
  //   name: 'UserManagement',
  //   path: `/`,
  //   icon: 'iconfont icon-tuanduiguanli2',
  //   parentId: '-1',
  //   description: '用户管理'
  // }),
  VersionManage: new Menu({
    id: 'menu0410',
    name: 'VersionManage',
    path: `/`,
    icon: 'iconfont icon-banben',
    parentId: '-1',
    description: 'App版本管理'
  }),
  ProjectAuthList: new Menu({
    id: ['menu0407', 'menu0214'],
    name: 'ProjectAuthList',
    path: `/`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '项目权限'
  }),
  taskManage: new Menu({
    id: 'menu0415',
    name: 'taskManage',
    path: `/`,
    icon: 'kown-img',
    parentId: '-1',
    description: '任务数据管理'
  }),
  orderManage: new Menu({
    id: 'menu0416',
    name: 'orderManage',
    path: `/`,
    icon: 'scule-img',
    parentId: '-1',
    description: '工单数据管理'
  }),

  offline: new Menu({
    id: 'menu0417',
    name: 'offline',
    path: `/`,
    icon: 'scule-img',
    parentId: '-1',
    description: '电梯离线统计'
  }),
  bigdata: new Menu({
    id: 'menu0420',
    name: 'bigdata',
    path: `/`,
    icon: 'scule-img',
    parentId: '-1',
    description: '大数据统计'
  }),
  nopaper: new Menu({
    id: ['menu0421', 'menu0218'],
    name: 'nopaper',
    path: `/`,
    icon: 'scule-img',
    parentId: '-1',
    description: '无纸化维保'
  }),
  UserManagementSer: new Menu({
    id: ['menu0210', 'menu0603', 'menu0403', 'menu0305', 'menu2408'],
    name: 'UserManagementSer',
    path: `/`,
    icon: 'iconfont icon-tuanduiguanli2',
    parentId: '-1',
    description: '用户管理'
  }),
  ReloadMemory: new Menu({
    id: 'menu0424',
    name: 'ReloadMemory',
    path: `/`,
    icon: 'iconfont icon-tuanduiguanli2',
    parentId: '-1',
    description: '重载内存'
  }),
  PropCompanyAuth: new Menu({
    id: ['menu0425'],
    name: 'PropCompanyAuth',
    path: `/`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '物业单位权限'
  }),
  MaintCompanyAuth: new Menu({
    id: ['menu0426'],
    name: 'MaintCompanyAuth',
    path: `/`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '维保单位权限'
  }),
  InsuCompanyAuth: new Menu({
    id: ['menu0427'],
    name: 'InsuCompanyAuth',
    path: `/`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '保险单位权限'
  }),
  InsureProcess: new Menu({
    id: ['menu2402'],
    name: 'InsureProcess',
    path: `/`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '保险流程'
  })
}
export const perfiex = 'elevator'
export const menulist = {
  // 运维平台
  index: new Menu({
    id: '1',
    name: 'index',
    path: `/${perfiex}/index`,
    icon: '',
    isNotMenu: true,
    meta: {
      haveNoHead: false
    }
  }),
  taskDetail: new Menu({
    id: '2',
    name: 'taskDetail',
    path: `/${perfiex}/task/detail:id`,
    icon: '',
    isNotMenu: true,
    meta: {
      haveNoHead: false
    }
  }),
  taskDetailPrint: new Menu({
    id: '2',
    name: 'taskDetailPrint',
    path: `/${perfiex}/task/detail:id/print`,
    icon: '',
    isNotMenu: true,
    meta: {
      haveNoHead: false
    }
  }),
  OrderDetail: new Menu({
    id: '2',
    name: 'OrderDetail',
    path: `/${perfiex}/order/detail:id/type:type(CallRepair|CleanUpkeep|Emergency|InstallIot|Medical|RegularUpkeep|RepairUpkeep)`,
    icon: '',
    isNotMenu: true,
    parentId: ['menu0219', 'menu0433'],
    meta: {
      haveNoHead: false
    }
  }),
  UAC: new Menu({
    id: 'menu0401',
    name: 'user',
    path: `/${perfiex}/uac`,
    icon: 'uac-img',
    parentId: '-1',
    description: 'UAC'
  }),
  EventManage: new Menu({
    id: 'menu0412',
    name: 'eventmanage',
    path: `/${perfiex}/eventmanage`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '电梯物联网事件统计'
  }),
  taskOrder: new Menu({
    id: ['menu0419', 'menu0217'],
    name: 'taskOrder',
    path: `/${perfiex}/taskOrder`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '任务工单修改',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),

  OfflineDistribution: new Menu({
    id: 'menu041701',
    name: 'offlineDistribution',
    path: `/${perfiex}/offlineDistribution`,
    icon: 'iconfont icon-changliangguanli',
    parentId: menuPrarent.offline.id,
    description: '电梯离线分布'
  }),
  offlineTimes: new Menu({
    id: 'menu041702',
    name: 'offlineTimes',
    path: `/${perfiex}/offlineTimes`,
    icon: 'iconfont icon-changliangguanli',
    parentId: menuPrarent.offline.id,
    description: '电梯离线次数'
  }),
  RunningStastic: new Menu({
    id: 'menu0418',
    name: 'runningStastic',
    path: `/${perfiex}/runningStastic`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '电梯周月运行统计'
  }),
  AccountManage: new Menu({
    id: 'menu0413',
    name: 'accountManage',
    path: `/${perfiex}/usercenter/accountManage`,
    icon: 'uac-img',
    parentId: '-1',
    description: '账户管理',
    meta: {
      ...new ActionAuthority('iaccount')
    }
  }),
  LogsQuery: new Menu({
    id: 'menu0414',
    name: 'logsQuery',
    path: `/${perfiex}/usercenter/logsQuery`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '日志查询'
  }),
  Org: new Menu({
    id: 'menu0402',
    name: 'org',
    path: `/${perfiex}/org`,
    icon: 'framework-img',
    parentId: '-1',
    description: '组织架构',
    meta: {
      ...new ActionAuthority('idepartment')
    }
  }),
  Alarmlog: new Menu({
    id: ['menu2419', 'menu0430'],
    name: 'alarmlog',
    path: `/${perfiex}/alarmlog`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: '-1',
    description: '接警记录'
  }),
  Scule: new Menu({
    id: 'menu0404',
    name: 'Scule',
    path: `/${perfiex}/scule`,
    icon: 'scule-img',
    parentId: '-1',
    description: '平台规则'
  }),
  AdminUser: new Menu({
    id: 'menu040301',
    name: 'AdminUser',
    path: `/${perfiex}/user/admin`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '管理员管理',
    meta: {
      ...new ActionAuthority('iopMaintUser')
    }
  }),
  OperUser: new Menu({
    id: 'menu040302',
    name: 'OperUser',
    path: `/${perfiex}/user/oper`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '运营用户管理',
    meta: {
      ...new ActionAuthority('ioperUser')
    }
  }),
  VisitorUser: new Menu({
    id: 'menu040304',
    name: 'VisitorUser',
    path: `/${perfiex}/user/visitor`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '游客用户管理'
  }),
  Config: new Menu({
    id: 'menu0406',
    name: 'Config',
    path: `/${perfiex}/config/manage`,
    icon: 'config-img',
    parentId: '-1',
    description: '平台推送配置'
  }),
  Tags: new Menu({
    id: 'menu040501',
    name: 'Tags',
    path: `/${perfiex}/tags`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '标签库'
  }),
  Component: new Menu({
    id: 'menu040503',
    name: 'component',
    path: `/${perfiex}/component`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '部件',
    meta: {
      ...new ActionAuthority('icomponent')
    }
  }),
  SpareParts: new Menu({
    id: 'menu040504',
    name: 'SpareParts',
    path: `/${perfiex}/ipart`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '零部件',
    meta: {
      ...new ActionAuthority('ipart')
    }
  }),
  BrandModel: new Menu({
    id: ['menu040502', 'menu021501'],
    name: 'BrandModel',
    path: `/${perfiex}/ibrand`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '品牌型号'
  }),
  BrandModelDetail: new Menu({
    id: 'menu040502-sub',
    name: 'BrandModelDetail',
    path: `/${perfiex}/brand/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu040502', 'menu021501'],
    description: '品牌型号详情',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('imodel')
    }
  }),
  IfaultCode: new Menu({
    id: 'menu040505',
    name: 'ifaultCode',
    path: `/${perfiex}/ifaultCode`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '故障码库',
    meta: {
      ...new ActionAuthority('icontrolEventCode')
    }
  }),
  IfaultWorkItem: new Menu({
    id: 'menu040506',
    name: 'IfaultWorkItem',
    path: `/${perfiex}/ifaultWorkItem`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '故障工作项',
    meta: {
      ...new ActionAuthority('iworkItem')
    }
  }),
  Iappearance: new Menu({
    id: 'menu040507',
    name: 'iappearance',
    path: `/${perfiex}/iappearance`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '现象库',
    meta: {
      ...new ActionAuthority('iappearance')
    }
  }),
  IappearWorkItem: new Menu({
    id: 'menu040508',
    name: 'iappearWorkItem',
    path: `/${perfiex}/iappearWorkItem`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '现象工作项',
    meta: {
      ...new ActionAuthority('iappearWorkItem')
    }
  }),
  Iupkeep: new Menu({
    id: 'menu040509',
    name: 'iupkeep',
    path: `/${perfiex}/iupkeep`,
    icon: '',
    parentId: menuPrarent.Kown.id,
    description: '保养手册'
  }),
  ProjectAuth: new Menu({
    id: ['menu040701', 'menu021401'],
    name: 'ProjectAuth',
    path: `/${perfiex}/elevator/projectAuth`,
    icon: '',
    parentId: menuPrarent.ProjectAuthList.id,
    description: '项目人员权限',
    meta: {
      ...new ActionAuthority('iproject'),
      isNotkeepAlive: true
    }
  }),
  UserProjectAuth: new Menu({
    id: ['menu040702', 'menu021402'],
    name: 'UserProjectAuth',
    path: `/${perfiex}/elevator/userAuth`,
    icon: '',
    parentId: menuPrarent.ProjectAuthList.id,
    description: '人员项目权限',
    meta: {
      ...new ActionAuthority('iproject'),
      isNotkeepAlive: true
    }
  }),
  ElevManage: new Menu({
    id: ['menu0408', 'menu0216'],
    name: 'ElevManage',
    path: `/${perfiex}/elevator/manage`,
    icon: 'iconfont icon-diantipeizhi2',
    parentId: '-1',
    description: '电梯档案管理',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  ElevManageCusotom: new Menu({
    id: ['menu2411'],
    name: 'ElevManageCusotom',
    path: `/${perfiex}/elevator/list`,
    icon: 'iconfont icon-diantipeizhi2',
    parentId: '-1',
    description: '电梯档案管理',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskInfo: new Menu({
    id: 'menu041501',
    name: 'taskInfo',
    path: `/${perfiex}/elevator/taskInfo`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '公共任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskMedical: new Menu({
    id: 'menu041502',
    name: 'taskMedical',
    path: `/${perfiex}/elevator/taskMedical`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '体检任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskCleanUpkeep: new Menu({
    id: 'menu041503',
    name: 'taskCleanUpkeep',
    path: `/${perfiex}/elevator/taskCleanUpkeep`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '清洁大保养任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskRepairUpkeep: new Menu({
    id: 'menu041504',
    name: 'taskRepairUpkeep',
    path: `/${perfiex}/elevator/taskRepairUpkeep`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '换修大保养任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskInstallIot: new Menu({
    id: 'menu041505',
    name: 'taskInstallIot',
    path: `/${perfiex}/elevator/taskInstallIot`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '安装物联网任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskRegularUpkeep: new Menu({
    id: 'menu041506',
    name: 'taskRegularUpkeep',
    path: `/${perfiex}/elevator/taskRegularUpkeep`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '常规保养任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskCallRepair: new Menu({
    id: 'menu041507',
    name: 'taskCallRepair',
    path: `/${perfiex}/elevator/taskCallRepair`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '召修任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  TaskEmergency: new Menu({
    id: 'menu041508',
    name: 'taskEmergency',
    path: `/${perfiex}/elevator/taskEmergency`,
    icon: '',
    parentId: menuPrarent.taskManage.id,
    description: '应急任务数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderInfo: new Menu({
    id: 'menu041601',
    name: 'orderInfo',
    path: `/${perfiex}/elevator/orderInfo`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '公共工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderMedical: new Menu({
    id: 'menu041602',
    name: 'orderMedical',
    path: `/${perfiex}/elevator/orderMedical`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '体检工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderCleanUpkeep: new Menu({
    id: 'menu041603',
    name: 'orderCleanUpkeep',
    path: `/${perfiex}/elevator/orderCleanUpkeep`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '清洁大保养工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderRepairUpkeep: new Menu({
    id: 'menu041604',
    name: 'orderRepairUpkeep',
    path: `/${perfiex}/elevator/orderRepairUpkeep`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '换修大保养工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderInstallIot: new Menu({
    id: 'menu041605',
    name: 'orderInstallIot',
    path: `/${perfiex}/elevator/orderInstallIot`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '安装物联网工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderRegularUpkeep: new Menu({
    id: 'menu041606',
    name: 'orderRegularUpkeep',
    path: `/${perfiex}/elevator/orderRegularUpkeep`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '常规保养工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderCallRepair: new Menu({
    id: 'menu041607',
    name: 'orderCallRepair',
    path: `/${perfiex}/elevator/orderCallRepair`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '召修工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),
  OrderEmergency: new Menu({
    id: 'menu041608',
    name: 'orderEmergency',
    path: `/${perfiex}/elevator/orderEmergency`,
    icon: '',
    parentId: menuPrarent.orderManage.id,
    description: '应急工单数据',
    meta: {
      ...new ActionAuthority('ielevator')
    }
  }),

  ConstManage: new Menu({
    id: 'menu0409',
    name: 'ConstManage',
    path: `/${perfiex}/elevator/constManage`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '常量管理',
    meta: {
      ...new ActionAuthority('iconstType')
    }
  }),
  AndroidVersion: new Menu({
    id: 'menu041001',
    name: 'AndroidVersion',
    path: `/${perfiex}/elevator/android/version`,
    icon: '',
    parentId: menuPrarent.VersionManage.id,
    description: 'Android版本管理',
    meta: {
      ...new ActionAuthority('iversionAndroid')
    }
  }),
  VersionHelmet: new Menu({
    id: 'menu041003',
    name: 'VersionHelmet',
    path: `/${perfiex}/elevator/helmet/version`,
    icon: '',
    parentId: menuPrarent.VersionManage.id,
    description: '安全帽版本管理',
    meta: {
      ...new ActionAuthority('iversionHelmet')
    }
  }),
  IOSVersion: new Menu({
    id: 'menu041002',
    name: 'IOSVersion',
    path: `/${perfiex}/elevator/ios/version`,
    icon: '',
    parentId: menuPrarent.VersionManage.id,
    description: 'IOS版本管理',
    meta: {
      ...new ActionAuthority('iversionIOS')
    }
  }),
  SysControllor: new Menu({
    id: 'menu0411',
    name: 'SysControllor',
    path: `/${perfiex}/elevator/sys`,
    icon: 'iconfont icon-chushihuahuancun',
    parentId: '-1',
    description: '系统控制'
  }),
  InsuUser: new Menu({
    id: ['menu040303'],
    name: 'InsuUser',
    path: `/${perfiex}/user/insuuer`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '保险用户管理',
    meta: {
      ...new ActionAuthority('iinsuUser')
    }
  }),
  InsuInsureUser: new Menu({
    id: ['menu240803'],
    name: 'InsuInsureUser',
    path: `/${perfiex}/insure/user`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '保险用户管理',
    meta: {
      ...new ActionAuthority('iinsuUser')
    }
  }),
  // BI
  OperBi: new Menu({
    id: ['menu0801', 'menu2420'],
    name: 'OperBi',
    path: `/${perfiex}/bi`,
    icon: 'iconfont icon-yunyingkanban',
    parentId: '-1',
    description: '运营看板',
    meta: {
      // isNotkeepAlive: true
    }
  }),
  InsuranceReport: new Menu({
    id: 'menu0802',
    name: 'InsuranceReport',
    path: `/${perfiex}/insurance/report`,
    icon: 'iconfont icon-baoxianbaobiao',
    parentId: '-1',
    description: '保险报表'
  }),
  CustomerBi: new Menu({
    id: ['menu0803', 'menu1105', 'menu2403'],
    name: 'CustomerBi',
    path: `/${perfiex}/customerBi`,
    icon: 'iconfont icon-yunyingkanban',
    parentId: '-1',
    description: '客户看板',
    meta: {
      isNotkeepAlive: true
    }
  }),
  FullVideo: new Menu({
    id: ['menu0803', 'menu1105', 'menu2403'],
    name: 'FullVideo',
    path: `/${perfiex}/FullVideo`,
    icon: '',
    isNotMenu: true,
    meta: {
      haveNoHead: false
    }
  }),
  CustomReport: new Menu({
    id: 'menu0804',
    name: 'CustomReport',
    path: `/${perfiex}/customer/report`,
    icon: 'iconfont icon-kehubaobiao',
    parentId: '-1',
    description: '客户报表'
  }),
  EngineeringServicesReport: new Menu({
    id: 'menu0805',
    name: 'EngineeringServicesReport',
    path: `/${perfiex}/service/report`,
    icon: 'iconfont icon-gongchengbaobiao',
    parentId: '-1',
    description: '工程服务报表'
  }),
  IotReport: new Menu({
    id: 'menu0806',
    name: 'IotReport',
    path: `/${perfiex}/iot/report`,
    icon: 'iconfont icon-wulianwangbaobiao',
    parentId: '-1',
    description: '物联网报表'
  }),
  ScmReport: new Menu({
    id: 'menu0807',
    name: 'ScmReport',
    path: `/${perfiex}/scm/report`,
    icon: 'iconfont icon-gongyinglianbaobiao',
    parentId: '-1',
    description: '供应链报表'
  }),
  StaffReport: new Menu({
    id: 'menu0808',
    name: 'StaffReport',
    path: `/${perfiex}/staff/report`,
    icon: 'iconfont icon-yuangongbaobiao',
    parentId: '-1',
    description: '员工报表'
  }),
  ElevatorBiConfiguration: new Menu({
    id: ['menu0809', 'menu2421'],
    name: 'ElevatorConfiguration',
    path: `/${perfiex}/elevator/configuration`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: '-1',
    description: '日志管理'
  }),
  RunningData: new Menu({
    id: 'menu0504',
    name: 'RunningData',
    path: `/${perfiex}/elevator/runningdata`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: '-1',
    description: '电梯实时运行数据'
  }),
  RunningData2: new Menu({
    id: 'menu0810',
    name: 'RunningData',
    path: `/${perfiex}/elevator/runningdata`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: '-1',
    description: '电梯实时运行数据'
  }),
  BiTestPage: new Menu({
    id: ['menu0811'],
    name: 'BiTestPage',
    path: `/${perfiex}/elevator/bi/config`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: '-1',
    description: 'BI设置'
  }),

  LogBiManagement: new Menu({
    id: 'menu0809-sub',
    name: 'Logmanagement',
    path: `/${perfiex}/log/management/code:id?`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: 'menu0809',
    description: '日志管理',
    isNotMenu: true
  }),

  // 营销平台
  ProjectManagement: new Menu({
    id: ['menu0101', 'menu0212'],
    name: 'ProjectManagement',
    path: `/${perfiex}/project/management`,
    icon: 'iconfont icon-xiangmuguanli1',
    parentId: '-1',
    description: '项目管理',
    meta: {
      ...new ActionAuthority('iproject')
    }
  }),
  ProjectManagementInsure: new Menu({
    id: ['menu2409'],
    name: 'ProjectManagementInsure',
    path: `/${perfiex}/insure/project/management`,
    icon: 'iconfont icon-xiangmuguanli1',
    parentId: '-1',
    description: '项目管理',
    meta: {
      ...new ActionAuthority('iproject')
    }
  }),
  ProjectManagementDetail: new Menu({
    id: 'menu0101-sub',
    name: 'ProjectManagementDetail',
    path: `/${perfiex}/project/management/detail:id?`,
    icon: 'iconfont icon-xiangmuguanli',
    parentId: ['menu0101', 'menu0212', 'menu2409'],
    isNotMenu: true,
    description: '项目详情',
    meta: {
      ...new ActionAuthority('iproject')
    }
  }),
  ContractManagement: new Menu({
    id: ['menu0102', 'menu0213', 'menu2410'],
    name: 'ContractManagement',
    path: `/${perfiex}/contract/management`,
    icon: 'iconfont icon-hetongguanli',
    parentId: '-1',
    description: '合同管理',
    meta: {
      ...new ActionAuthority('icontract')
    }
  }),
  ContractManagementDetail: new Menu({
    id: 'menu0102-sub',
    name: 'ContractManagementDetail',
    path: `/${perfiex}/contract/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu0102', 'menu0213'],
    description: '合同详情',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('icontract')
    }
  }),
  ContractManagementEditDetail: new Menu({
    id: 'menu0102-sub1',
    name: 'ContractManagementEditDetail',
    path: `/${perfiex}/contract/edit:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: 'menu0102',
    description: '合同编辑',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('icontract'),
      isNotkeepAlive: true
    }
  }),
  ContractManagementElevatorDetail: new Menu({
    id: 'menu0102-sub2',
    name: 'ContractManagementElevatorDetail',
    path: `/${perfiex}/contract/elevator/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: 'menu0102',
    description: '电梯详情',
    isNotMenu: true
  }),
  InsuCompany: new Menu({
    id: ['menu0103', 'menu0208'],
    name: 'InsuCompany',
    path: `/${perfiex}/insu/company`,
    icon: 'iconfont icon-weibaogongsi2',
    parentId: '-1',
    description: '使用单位管理',
    meta: {
      ...new ActionAuthority('ipropCompany')
    }
  }),
  ProCompany: new Menu({
    id: ['menu2405'],
    name: 'ProCompany',
    path: `/${perfiex}/pro/company`,
    icon: 'iconfont icon-weibaogongsi2',
    parentId: '-1',
    description: '使用单位管理',
    meta: {
      ...new ActionAuthority('ipropCompany')
    }
  }),
  MarkUser: new Menu({
    id: 'menu010401',
    name: 'MarkUser',
    path: `/${perfiex}/usercenter/markUser`,
    icon: '',
    parentId: menuPrarent.UserCompany.id,
    description: '营销用户管理',
    meta: {
      ...new ActionAuthority('imarkUser')
    }
  }),
  PropUser: new Menu({
    id: 'menu010402',
    name: 'PropUser',
    path: `/${perfiex}/usercenter/propUser`,
    icon: '',
    parentId: menuPrarent.UserCompany.id,
    description: '客户用户管理',
    meta: {
      ...new ActionAuthority('ipropUser')
    }
  }),
  PropUserSer: new Menu({
    id: ['menu021001'],
    name: 'PropUser',
    path: `/${perfiex}/usercenter/propUser`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '客户用户管理',
    meta: {
      ...new ActionAuthority('ipropUser')
    }
  }),

  PropUserInsureSer: new Menu({
    id: ['menu240801'],
    name: 'PropUserInsureSer',
    path: `/${perfiex}/prop/user`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '客户用户管理',
    meta: {
      ...new ActionAuthority('ipropUser')
    }
  }),

  // 工程服务平台

  PlanManagement: new Menu({
    id: 'menu0601',
    name: 'PlanManagement',
    path: `/${perfiex}/plan/management`,
    icon: 'iconfont icon-jihuaguanli',
    parentId: '-1',
    description: '计划管理',
    meta: {
      ...new ActionAuthority('ischedule')
    }
  }),

  TaskManagement: new Menu({
    id: ['menu0602', 'menu2404'],
    name: 'TaskManagement',
    path: `/${perfiex}/task/management`,
    icon: 'iconfont icon-renwuguanli',
    parentId: '-1',
    description: '任务管理',
    meta: {
      ...new ActionAuthority('', {
        add: 'itaskMedical/createTask',
        delete: 'deleteById',
        edit: 'itaskMedical/evaluateTask'
      })
    }
  }),
  TaskManagementList: new Menu({
    id: ['menu2412'],
    name: 'TaskManagementList',
    path: `/${perfiex}/task/management/list`,
    icon: 'iconfont icon-renwuguanli',
    parentId: '-1',
    description: '任务工单查询',
    meta: {
      ...new ActionAuthority('', {
        add: 'itaskMedical/createTask',
        delete: 'deleteById',
        edit: 'itaskMedical/evaluateTask'
      })
    }
  }),
  TeamManagement: new Menu({
    id: ['menu060301', 'menu021002', 'menu240802'],
    name: 'TeamManagement',
    path: `/${perfiex}/team/management`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '维保用户管理',
    meta: {
      ...new ActionAuthority('ienginUser'),
      posiId: '1516732642610339849'
    }
  }),
  TeamManagementBelow: new Menu({
    id: ['menu060302', 'menu021003', 'menu240804'],
    name: 'TeamManagementBelow',
    path: `/${perfiex}/team/management/list`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '维保用户管理',
    meta: {
      ...new ActionAuthority('ienginUser'),
      posiId: '1516732642610339840'
    }
  }),
  TeamUserEdit: new Menu({
    id: 'menu0603-sub',
    name: 'TeamUserEdit',
    path: `/${perfiex}/team/management/action:action(edit|new)/id:id?`,
    icon: 'iconfont icon-tuanduiguanli',
    parentId: ['menu060301', 'menu021002', 'menu240802'],
    description: '用户编辑',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('ienginUser'),
      isNotkeepAlive: true
    }
  }),
  TeamUserEngEdit: new Menu({
    id: 'menu021002-sub',
    name: 'TeamUserEngEdit',
    path: `/${perfiex}/team/below/management/action:action(edit|new)/id:id?`,
    icon: 'iconfont icon-tuanduiguanli',
    parentId: ['menu060302', 'menu021003', 'menu240804'],
    description: '用户编辑',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('ienginUser'),
      isNotkeepAlive: true
    }
  }),

  PreAnalysis: new Menu({
    id: 'menu0604',
    name: 'PreAnalysis',
    path: `/${perfiex}/elevator_schedule/preAnalysis`,
    icon: 'iconfont icon-yucexingfenxi',
    parentId: '-1',
    description: '预测性分析',
    meta: {
      ...new ActionAuthority('', {
        add: 'itaskMedical/createTask',
        delete: 'deleteById',
        edit: 'itaskMedical/evaluateTask'
      })
    }
  }),

  // 供应链平台

  MaintenanceCompany: new Menu({
    id: ['menu0301', 'menu0209'],
    name: 'MaintenanceCompany',
    path: `/${perfiex}/maintenance/company`,
    icon: 'iconfont icon-weibaogongsi1',
    parentId: '-1',
    description: '维保公司',
    meta: {
      ...new ActionAuthority('imaintCompany')
    }
  }),
  InsureMaintenanceCompany: new Menu({
    id: ['menu2406'],
    name: 'InsureMaintenanceCompany',
    path: `/${perfiex}/insure/maintenance/company`,
    icon: 'iconfont icon-weibaogongsi1',
    parentId: '-1',
    description: '维保公司',
    meta: {
      ...new ActionAuthority('imaintCompany')
    }
  }),
  MaintenanceCompanyEdit: new Menu({
    id: 'menu0301-sub',
    name: 'MaintenanceCompanyEdit',
    path: `/${perfiex}/maintenance/company/action:action(edit|new)/id:id?`,
    icon: 'iconfont icon-baoxiangongsi1',
    parentId: ['menu0301', 'menu0209'],
    description: '维保公司',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('imaintCompany'),
      isNotkeepAlive: true
    }
  }),
  MaintenanceCompanyInsureEdit: new Menu({
    id: 'menu02406-sub',
    name: 'MaintenanceCompanyInsureEdit',
    path: `/${perfiex}/maintenance/insure/company/action:action(edit|new)/id:id?`,
    icon: 'iconfont icon-baoxiangongsi1',
    parentId: ['menu2406'],
    description: '维保公司',
    isNotMenu: true,
    meta: {
      ...new ActionAuthority('imaintCompany'),
      isNotkeepAlive: true
    }
  }),

  InsuranceCompany: new Menu({
    id: ['menu0302'],
    name: 'InsuranceCompany',
    path: `/${perfiex}/insurance/company`,
    icon: 'iconfont icon-baoxiangongsi1',
    parentId: '-1',
    description: '保险公司',
    meta: {
      ...new ActionAuthority('iinsuCompany')
    }
  }),
  InsuranceInsureCompany: new Menu({
    id: ['menu2407'],
    name: 'InsuranceInsureCompany',
    path: `/${perfiex}/insure/company`,
    icon: 'iconfont icon-baoxiangongsi1',
    parentId: '-1',
    description: '保险公司',
    meta: {
      ...new ActionAuthority('iinsuCompany')
    }
  }),
  SuppCompany: new Menu({
    id: 'menu0303',
    name: 'SuppCompany',
    path: `/${perfiex}/suppCompany`,
    icon: 'iconfont icon-gongyingshang',
    parentId: '-1',
    description: '供应商公司',
    meta: {
      ...new ActionAuthority('isuppCompany')
    }
  }),

  AccessoriesList: new Menu({
    id: ['menu0304', 'menu0211'],
    name: 'AccessoriesList',
    path: `/${perfiex}/accessories/list`,
    icon: 'iconfont icon-peijianqingdan1',
    parentId: '-1',
    description: '配件清单',
    meta: {
      ...new ActionAuthority('ipartInstance')
    }
  }),
  SuppUser: new Menu({
    id: 'menu030501',
    name: 'SuppUser',
    path: `/${perfiex}/company/suppuser`,
    icon: '',
    parentId: menuPrarent.UserManagementSer.id,
    description: '用户管理',
    meta: {
      ...new ActionAuthority('isuppUser')
    }
  }),
  Material: new Menu({
    id: 'menu0306',
    name: 'Material',
    path: `/${perfiex}/company/material`,
    icon: 'iconfont icon-wuliaoqingdan',
    parentId: '-1',
    description: '物料清单',
    meta: {
      ...new ActionAuthority('imaterial')
    }
  }),
  // 物联网
  ElevatorConfiguration: new Menu({
    id: 'menu0502',
    name: 'ElevatorConfiguration',
    path: `/${perfiex}/elevator/configuration`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: '-1',
    description: '日志管理'
  }),

  LogManagement: new Menu({
    id: 'menu0502-sub',
    name: 'Logmanagement',
    path: `/${perfiex}/log/management/code:id?`,
    icon: 'iconfont icon-rizhiguanli2',
    parentId: 'menu0502',
    description: '日志管理',
    isNotMenu: true
  }),

  PaaSConfiguration: new Menu({
    id: 'menu0503',
    name: 'PaaSConfiguration',
    path: `/${perfiex}/paas/configuration`,
    icon: 'iconfont icon-paas',
    parentId: '-1',
    description: 'PaaS配置'
  }),
  ElevatorProjectConfiguration: new Menu({
    id: 'menu0501',
    name: 'ElevatorProjectConfiguration',
    path: `/${perfiex}/elevator/project/configuration`,
    icon: 'iconfont icon-diantipeizhi2',
    parentId: '-1',
    description: '电梯配置记录'
  }),

  // 客户平台
  Workbench: new Menu({
    id: 'menu0201',
    name: 'Workbench',
    path: `/${perfiex}/workbench`,
    icon: 'iconfont icon-gongzuotai',
    parentId: '-1',
    description: '工作台'
  }),

  CallRecord: new Menu({
    id: 'menu0202',
    name: 'CallRecord',
    path: `/${perfiex}/call/record`,
    icon: 'iconfont icon-tonghuajilu',
    parentId: '-1',
    description: '通话记录'
  }),

  EmergencyManagement: new Menu({
    id: 'menu0203',
    name: 'EmergencyManagement',
    path: `/${perfiex}/emergency/management`,
    icon: 'iconfont icon-yingjichuzhi',
    parentId: '-1',
    description: '应急处理'
  }),
  AlarmReceivingManagement: new Menu({
    id: 'menu0204',
    name: 'AlarmReceivingManagement',
    path: `/${perfiex}/alarmreceiving/management`,
    icon: 'iconfont icon-jiejingguanli',
    parentId: '-1',
    description: '接警管理'
  }),
  ComplaintManagement: new Menu({
    id: 'menu0205',
    name: 'ComplaintManagement',
    path: `/${perfiex}/complaint/management`,
    icon: 'iconfont icon-tousuguanli',
    parentId: '-1',
    description: '投诉管理'
  }),
  ConsultingManagement: new Menu({
    id: 'menu0206',
    name: 'ConsultingManagement',
    path: `/${perfiex}/consulting/management`,
    icon: 'iconfont icon-zixunguanli',
    parentId: '-1',
    description: '咨询管理'
  }),
  ServUser: new Menu({
    id: 'menu0207',
    name: 'ServUser',
    path: `/${perfiex}/service/servUser`,
    icon: 'iconfont  icon-kefuguanli',
    parentId: '-1',
    description: '客服管理',
    meta: {
      ...new ActionAuthority('iservUser')
    }
  }),

  bigDataStateDay: new Menu({
    id: 'menu042001',
    name: 'bigDataStateDay',
    path: `/${perfiex}/day/state`,
    icon: '',
    parentId: menuPrarent.bigdata.id,
    description: '电梯每日状态',
    meta: {
      ...new ActionAuthority('ieverydaystatus')
    }
  }),
  bigDataPassengersDay: new Menu({
    id: 'menu042006',
    name: 'bigDataPassengersDay',
    path: `/${perfiex}/day/passengers`,
    icon: '',
    parentId: menuPrarent.bigdata.id,
    description: '乘梯人数统计'
  }),
  bigDataBrokenPredictDay: new Menu({
    id: 'menu042002',
    name: 'bigDataBrokenPredictDay',
    path: `/${perfiex}/predict/state`,
    icon: '',
    parentId: menuPrarent.bigdata.id,
    description: '电梯每日损坏预测',
    meta: {
      ...new ActionAuthority('iforecastdamage')
    }
  }),
  bigDataLoseFloorDay: new Menu({
    id: 'menu042003',
    name: 'bigDataLoseFloorDay',
    path: `/${perfiex}/predict/lose/floor`,
    icon: '',
    parentId: menuPrarent.bigdata.id,
    description: '电梯每日缺失楼层',
    meta: {
      ...new ActionAuthority('iforecastdamagefloor')
    }
  }),
  bigDataRunStatisticDay: new Menu({
    id: 'menu042004',
    name: 'bigDataRunStatisticDay',
    path: `/${perfiex}/run/day/state`,
    icon: '',
    parentId: menuPrarent.bigdata.id,
    description: '运行数据每日统计',
    meta: {
      ...new ActionAuthority('irunningdaytotal')
    }
  }),
  bigDataLotMonthFloor: new Menu({
    id: 'menu042005',
    name: 'bigDataLotMonthFloor',
    path: `/${perfiex}/month/day`,
    icon: '',
    parentId: menuPrarent.bigdata.id,
    description: '楼层较多统计',
    meta: {
      ...new ActionAuthority('irunningstatedoormonth')
    }
  }),
  noPaperPage: new Menu({
    id: ['menu042101', 'menu021801'],
    name: 'noPaperPage',
    path: `/${perfiex}/nopaper/upload`,
    icon: '',
    parentId: menuPrarent.nopaper.id,
    description: '无纸化维保推送'
  }),
  noPaperPageLog: new Menu({
    id: ['menu042103', 'menu021803'],
    name: 'noPaperPageLog',
    path: `/${perfiex}/nopaper/log`,
    icon: '',
    parentId: menuPrarent.nopaper.id,
    description: '无纸化维保推送日志'
  }),

  noPaperPageCustomLog: new Menu({
    id: ['menu2416', 'menu0605'],
    name: 'noPaperPageCustomLog',
    path: `/${perfiex}/log`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '',
    description: '无纸化维保推送日志'
  }),

  noPaperPagecqupload: new Menu({
    id: ['menu042102', 'menu021802'],
    name: 'noPaperPagecqupload',
    path: `/${perfiex}/nopaper/cq/upload`,
    icon: '',
    parentId: menuPrarent.nopaper.id,
    description: '无纸化维保推送'
  }),
  issueList: new Menu({
    id: 'menu1101',
    name: 'issueList',
    path: `/${perfiex}/issue/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '问题清单',
    meta: {
      ...new ActionAuthority('issueList')
    }
  }),
  stoprecord: new Menu({
    id: 'menu0422',
    name: 'stoprecord',
    path: `/${perfiex}/stoprecord/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '停梯记录',
    meta: {
      ...new ActionAuthority('istoprecord')
    }
  }),
  dynamicWorkIt: new Menu({
    id: 'menu1102',
    name: 'dynamicWorkIt',
    path: `/${perfiex}/dynamicWorkIt/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '动态工作项',
    meta: {
      ...new ActionAuthority('idynamicWorkIt')
    }
  }),
  resetPartInstRunData: new Menu({
    id: 'menu1107',
    name: 'ResetPartInstRunData',
    path: `/${perfiex}/reset/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '重置配件运行数据'
  }),
  BICommentArea: new Menu({
    id: 'menu1103',
    name: 'BICommentArea',
    path: `/${perfiex}/BICommentArea/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '技术分析',
    meta: {
      ...new ActionAuthority('ibiCommentArea')
    }
  }),
  serviceReport: new Menu({
    id: 'menu1104',
    name: 'serviceReport',
    path: `/${perfiex}/serviceReport/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '技术分析',
    meta: {
      ...new ActionAuthority('iserviceReport')
    }
  }),
  Helmet: new Menu({
    id: 'menu0423',
    name: 'Helmet',
    path: `/${perfiex}/helmet/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '安全帽管理',
    meta: {
      ...new ActionAuthority('ihelmet')
    }
  }),
  ExpertSuggest: new Menu({
    id: 'menu1106',
    name: 'ExpertSuggest',
    path: `/${perfiex}/expert/suggest`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '专家录入'
  }),
  ReloadData: new Menu({
    id: 'menu042401',
    name: 'ReloadData',
    path: `/${perfiex}/reloaddata`,
    icon: '',
    parentId: menuPrarent.ReloadMemory.id,
    description: '重载基础数据'
  }),
  ReloadParam: new Menu({
    id: 'menu042402',
    name: 'ReloadParam',
    path: `/${perfiex}/reloadparam`,
    icon: '',
    parentId: menuPrarent.ReloadMemory.id,
    description: '重载运行参数'
  }),
  ReloadConfig: new Menu({
    id: 'menu042403',
    name: 'ReloadConfig',
    path: `/${perfiex}/reloadconfig`,
    icon: '',
    parentId: menuPrarent.ReloadMemory.id,
    description: '重载配置'
  }),
  FeedBack: new Menu({
    id: 'menu1108',
    name: 'FeedBack',
    path: `/${perfiex}/expert/feedback`,
    icon: 'iconfont icon-xiangmuquanxian',
    parentId: '-1',
    description: '问题反馈'
  }),

  MaintCompUserAuth: new Menu({
    id: ['menu042601'],
    name: 'MaintCompUserAuth',
    path: `/${perfiex}/elevator/maintcompany/auth`,
    icon: '',
    parentId: menuPrarent.MaintCompanyAuth.id,
    description: '单位人员权限',
    meta: {
      isNotkeepAlive: true
    }
  }),
  UserMaintCompAuth: new Menu({
    id: ['menu042602'],
    name: 'UserMaintCompAuth',
    path: `/${perfiex}/elevator/user/maincompany/auth`,
    icon: '',
    parentId: menuPrarent.MaintCompanyAuth.id,
    description: '人员单位权限',
    meta: {
      isNotkeepAlive: true
    }
  }),

  PropCompUserAuth: new Menu({
    id: ['menu042501'],
    name: 'PropCompUserAuth',
    path: `/${perfiex}/elevator/procompany/auth`,
    icon: '',
    parentId: menuPrarent.PropCompanyAuth.id,
    description: '单位人员权限',
    meta: {
      isNotkeepAlive: true
    }
  }),
  UserPropCompAuth: new Menu({
    id: ['menu042502'],
    name: 'UserPropCompAuth',
    path: `/${perfiex}/elevator/user/procompany/auth`,
    icon: '',
    parentId: menuPrarent.PropCompanyAuth.id,
    description: '人员单位权限',
    meta: {
      isNotkeepAlive: true
    }
  }),
  InsuCompUserAuth: new Menu({
    id: ['menu042701'],
    name: 'InsuCompUserAuth',
    path: `/${perfiex}/elevator/insucompany/auth`,
    icon: '',
    parentId: menuPrarent.InsuCompanyAuth.id,
    description: '单位人员权限',
    meta: {
      isNotkeepAlive: true
    }
  }),
  UserInsuCompAuth: new Menu({
    id: ['menu042702'],
    name: 'UserInsuCompAuth',
    path: `/${perfiex}/elevator/user/insucompany/auth`,
    icon: '',
    parentId: menuPrarent.InsuCompanyAuth.id,
    description: '人员单位权限',
    meta: {
      isNotkeepAlive: true
    }
  }),
  InsureList: new Menu({
    id: ['menu240201'],
    name: 'InsureList',
    path: `/${perfiex}/insure/property/list`,
    icon: '',
    description: '保险发起',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      add: 'iinsuranceInfo/start',
      haveNew: true,
      status: '02,03,04,05,06,07,08,09,10,11,12,13,14'
    }
  }),
  InsureDetail: new Menu({
    id: 'menu2402-sub',
    name: 'InsureListDetail',
    path: `/${perfiex}/insure/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240201'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureList',
      isNotkeepAlive: true
    }
  }),

  InsureInsuList: new Menu({
    id: ['menu240216'],
    name: 'InsureInsuList',
    path: `/${perfiex}/insure/launch/list`,
    icon: '',
    description: '故障报险',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      add: 'iinsuranceInfo/start',
      haveNew: true,
      status: '02'
    }
  }),
  InsureInsuDetail: new Menu({
    id: 'menu240216-sub',
    name: 'InsureInsuListDetail',
    path: `/${perfiex}/insure/launch/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240216'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureInsuList',
      isNotkeepAlive: true
    }
  }),

  PropertyBI: new Menu({
    id: 'menu2413',
    name: 'PropertyBI',
    path: `/${perfiex}/PropertyBI`,
    icon: 'iconfont icon-yunyingkanban',
    description: '物业看板',
    parentId: '-1',
    meta: {
      isNotkeepAlive: true
    }
  }),
  InsureBI: new Menu({
    id: ['menu2401'],
    name: 'InsureBI',
    path: `/${perfiex}/InsureBI`,
    icon: 'iconfont icon-yunyingkanban',
    description: '保险看板',
    parentId: '-1',
    meta: {
      isNotkeepAlive: true
    }
  }),
  EngineeringBI: new Menu({
    id: 'menu2414',
    name: 'EngineeringBI',
    path: `/${perfiex}/EngineeringBI`,
    icon: 'iconfont icon-yunyingkanban',
    description: '工程看板',
    parentId: '-1',
    meta: {
      isNotkeepAlive: true
    }
  }),
  InsureOnSite: new Menu({
    id: ['menu240203'],
    name: 'InsureOnSite',
    path: `/${perfiex}/insure/onsite/list`,
    icon: '',
    description: '现场勘验',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '03'
    }
  }),
  InsureOnSiteDetail: new Menu({
    id: 'menu24021-sub',
    name: 'InsureOnSiteDetail',
    path: `/${perfiex}/insure/onsite/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240203'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureOnSite',
      isNotkeepAlive: true
    }
  }),
  Insurequotation: new Menu({
    id: ['menu240208'],
    name: 'Insurequotation',
    path: `/${perfiex}/insure/quotation/list`,
    icon: '',
    description: '上传报价方案',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '06'
    }
  }),
  InsurequotationDetail: new Menu({
    id: 'menu24022-sub',
    name: 'InsurequotationDetail',
    path: `/${perfiex}/insure/quotation/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240208'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'Insurequotation',
      isNotkeepAlive: true
    }
  }),
  InsurequotationTLAudit: new Menu({
    id: ['menu240209'],
    name: 'InsurequotationTLAudit',
    path: `/${perfiex}/insure/quotationtlaudit/list`,
    icon: '',
    description: '初审报价方案',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '07'
    }
  }),
  InsurequotationTLAuditDetail: new Menu({
    id: 'menu24023-sub',
    name: 'InsurequotationTLAuditDetail',
    path: `/${perfiex}/insure/quotationtlaudit/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240209'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsurequotationTLAudit',
      isNotkeepAlive: true
    }
  }),
  InsureassessLoss: new Menu({
    id: ['menu240210'],
    name: 'InsureassessLoss',
    path: `/${perfiex}/insure/assessLoss/list`,
    icon: '',
    description: '定责定损',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '08'
    }
  }),
  InsureassessLossDetail: new Menu({
    id: 'menu24024-sub',
    name: 'InsureassessLossDetail',
    path: `/${perfiex}/insure/assessloss/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240210'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureassessLoss',
      isNotkeepAlive: true
    }
  }),
  InsurefinishTLComfirm: new Menu({
    id: ['menu240211'],
    name: 'InsurefinishTLComfirm',
    path: `/${perfiex}/insure/finishtlcomfirm/list`,
    icon: '',
    description: '确认完成维修',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '12'
    }
  }),
  InsurefinishTLComfirmDetail: new Menu({
    id: 'menu24025-sub',
    name: 'InsurefinishTLComfirmDetail',
    path: `/${perfiex}/insure/finishtlcomfirm/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240211'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsurefinishTLComfirm',
      isNotkeepAlive: true
    }
  }),
  InsuresettleAudit: new Menu({
    id: ['menu240212'],
    name: 'InsuresettleAudit',
    path: `/${perfiex}/insure/settleaudit/list`,
    icon: '',
    description: '审核结算',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '13'
    }
  }),
  InsuresettleAuditDetail: new Menu({
    id: 'menu24026-sub',
    name: 'InsuresettleAuditDetail',
    path: `/${perfiex}/insure/settleaudit/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240212'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsuresettleAudit',
      isNotkeepAlive: true
    }
  }),
  InsurePayComfirm: new Menu({
    id: ['menu240213'],
    name: 'InsurePayComfirm',
    path: `/${perfiex}/insure/paycomfirm/list`,
    icon: '',
    description: '支付确认',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '14'
    }
  }),
  InsurePayComfirmDetail: new Menu({
    id: 'menu24027-sub',
    name: 'InsurePayComfirmDetail',
    path: `/${perfiex}/insure/paycomfirm/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240213'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsurePayComfirm',
      isNotkeepAlive: true
    }
  }),
  Insurefiling: new Menu({
    id: ['menu240214'],
    name: 'Insurefiling',
    path: `/${perfiex}/insure/filing/list`,
    icon: '',
    description: '完结归档',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '15'
    }
  }),
  InsurefilingDetail: new Menu({
    id: 'menu24028-sub',
    name: 'InsurefilingDetail',
    path: `/${perfiex}/insure/filling/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240214'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'Insurefiling',
      isNotkeepAlive: true
    }
  }),
  InsureSubmitPlan: new Menu({
    id: ['menu240204'],
    name: 'InsureSubmitPlan',
    path: `/${perfiex}/insure/submitplan/list`,
    icon: '',
    description: '上传维修方案',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '04'
    }
  }),
  InsureSubmitPlanDetail: new Menu({
    id: 'menu24029-sub',
    name: 'InsureSubmitPlanDetail',
    path: `/${perfiex}/insure/submitplan/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240204'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureSubmitPlan',
      isNotkeepAlive: true
    }
  }),
  InsureAudit: new Menu({
    //物业
    id: ['menu240205'],
    name: 'InsureAudit',
    path: `/${perfiex}/insure/propaudit/list`,
    icon: '',
    description: '审核维修方案',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '05'
    }
  }),
  InsureAuditDetail: new Menu({
    id: 'menu240210-sub',
    name: 'InsureAuditDetail',
    path: `/${perfiex}/insure/audit/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240205'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureAudit',
      isNotkeepAlive: true
    }
  }),
  InsureTLAudit: new Menu({
    //平台
    id: ['menu240206'],
    name: 'InsureTLAudit',
    path: `/${perfiex}/insure/tlaudit/list`,
    icon: '',
    description: '审核维修方案',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '05'
    }
  }),
  InsureTLAuditDetail: new Menu({
    id: 'menu240211-sub',
    name: 'InsureTLAuditDetail',
    path: `/${perfiex}/insure/tlaudit/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240206'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureTLAudit',
      isNotkeepAlive: true
    }
  }),
  InsureInuserAudit: new Menu({
    //保险
    id: ['menu240207'],
    name: 'InsureInuserAudit',
    path: `/${perfiex}/insure/insuretlaudit/list`,
    icon: '',
    description: '审核维修方案',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: '05'
    }
  }),
  InsureInuserAuditDetail: new Menu({
    id: 'menu240212-sub',
    name: 'InsureInuserAuditDetail',
    path: `/${perfiex}/insure/inuseraudit/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240207'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureInuserAudit',
      isNotkeepAlive: true
    }
  }),
  InsureAllList: new Menu({
    id: ['menu240215'],
    name: 'InsureAllList',
    path: `/${perfiex}/insure/all/list`,
    icon: '',
    description: '所有保险流程',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: ''
    }
  }),
  InsureAllListDetail: new Menu({
    id: 'menu240213-sub',
    name: 'InsureAllListDetail',
    path: `/${perfiex}/insure/all/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu240215'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureAllList',
      isNotkeepAlive: true
    }
  }),
  RunningEventPushLogs: new Menu({
    id: 'menu0428',
    name: 'RunningEventPushLogs',
    path: `/${perfiex}/elevator/running/eventpushlogs`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '事件推送记录',
    meta: {
      ...new ActionAuthority('irunningEventPushLogs')
    }
  }),
  EmergencyOrderServerManage: new Menu({
    id: ['menu0219', 'menu0433'],
    name: 'EmergencyOrdermanage',
    path: `/${perfiex}/server/emergency`,
    icon: 'iconfont icon-changliangguanli',
    parentId: '-1',
    description: '应急工单',
    meta: {
      add: 'itaskEmergency/createTaskEmergency'
    }
  }),

  InsureManagementList: new Menu({
    id: ['menu0429', 'menu0222'],
    name: 'InsureManagementList',
    path: `/${perfiex}/insure/management/list`,
    icon: 'iconfont icon-xiangmuquanxian',
    description: '保险记录维护',
    parentId: menuPrarent.InsureProcess.id,
    meta: {
      ...new ActionAuthority('iinsuranceInfo'),
      status: ''
    }
  }),
  InsureManagementListDetail: new Menu({
    id: 'menu0429-sub',
    name: 'InsureManagementListDetail',
    path: `/${perfiex}/insure/management/management/detail:id?`,
    icon: 'iconfont icon-hetongguanli',
    parentId: ['menu0429', 'menu0222'],
    description: '保险详情',
    isNotMenu: true,
    meta: {
      routerName: 'InsureManagementList',
      isNotkeepAlive: true
    }
  }),

  QrList: new Menu({
    id: 'menu2415',
    name: 'QrList',
    path: `/${perfiex}/qrcode/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '二维码管理',
    meta: {
      ...new ActionAuthority('iQRCode')
    }
  }),
  AnualInspectList: new Menu({
    id: ['menu0221', 'menu2423'],
    name: 'AnualInspectList',
    path: `/${perfiex}/service/annualinspect`,
    icon: 'iconfont icon-hetongguanli',
    description: '年检记录管理',
    meta: {
      ...new ActionAuthority('iannualInspect'),
      edit: '/tkwl/insuPlatForm/annualInspectEdit'
    }
  }),
  PartInstReplaceList: new Menu({
    id: ['menu0220', 'menu2422'],
    name: 'PartInstReplaceList',
    path: `/${perfiex}/service/replace/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '换件记录管理',
    meta: {
      ...new ActionAuthority('ipartInstReplace')
    }
  }),
  MaintDelay: new Menu({
    id: 'menu2417',
    name: 'MaintDelay',
    path: `/${perfiex}/maintdelay/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '换件记录管理',
    meta: {
      ...new ActionAuthority('imaintDelay'),
      add: 'imaintDelay/applyDelay'
    }
  }),
  ProjectLife: new Menu({
    id: 'menu0431',
    name: 'ProjectLife',
    path: `/${perfiex}/project/life`,
    icon: 'iconfont icon-hetongguanli',
    description: '项目生命周期',
    meta: {
      ...new ActionAuthority('iprojectLife')
    }
  }),
  MaintDelayApprove: new Menu({
    id: 'menu2418',
    name: 'MaintDelayApprove',
    path: `/${perfiex}/maintdelay/approve/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '延期审核',
    meta: {
      ...new ActionAuthority('imaintDelay'),
      add: 'imaintDelay/applyDelay'
    }
  }),
  AlarmlogManagement: new Menu({
    id: 'menu0432',
    name: 'AlarmlogManagement',
    path: `/${perfiex}/alarm/log/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '接警管理',
    meta: {}
  }),
  PassByEngine: new Menu({
    id: 'menu2427',
    name: 'PassByEngine',
    path: `/${perfiex}/pass/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '转派与验收',
    meta: {}
  }),
  CallRepairPro: new Menu({
    id: 'menu2425',
    name: 'CallRepairPro',
    path: `/${perfiex}/callrepair/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '报修记录',
    meta: {
      add: 'itaskCallRepair/createTask'
    }
  }),
  PassByPropUser: new Menu({
    id: 'menu2426',
    name: 'PassByPropUser',
    path: `/${perfiex}/evalute/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '验收与评价'
  }),
  AnnualInspect: new Menu({
    id: 'menu2424',
    name: 'AnnualInspect',
    path: `/${perfiex}/annualinspect/list`,
    icon: 'iconfont icon-hetongguanli',
    description: '年检',
    meta: {
      edit: 'iannualInspect/updateById'
    }
  })
}
export const menuRoute = {
  whiteList: [
    {
      path: '/',
      name: 'loginBi',
      component: () => import('@/views/LoginBi/')
    },
    {
      path: '/tkwl/login',
      name: 'login',
      component: () => import('@/views/Login/')
    },
    {
      path: '/dataPlatform',
      name: 'dataPlatform',
      component: () => import('@/views/dataPlatform')
    },
    {
      path: '/404',
      name: '404',
      component: () => import('@/views/404/404')
    },
    // {
    //   path: '/property',
    //   name: 'LoginProperty',
    //   component: () => import('@/views/LoginProperty/')
    // },
    {
      path: '/tkwl/elesp',
      name: 'LoginInsure',
      component: () => import('@/views/LoginInsure/')
    }
    // {
    //   path: '/engineering',
    //   name: 'LoginEngineering',
    //   component: () => import('@/views/LoginEngineering/')
    // }
  ],
  singlePage: [
    {
      ...menulist.taskDetail,
      component: () => import('@/components/task/taskDetail')
    },
    {
      ...menulist.OrderDetail,
      component: () => import('@/components/task/orderDetail')
    },
    {
      ...menulist.taskDetailPrint,
      component: () => import('@/components/task/printTask')
    },
    {
      ...menulist.FullVideo,
      component: () => import('@/components/common/fullVideo')
    }
  ], // 不需要单独的一级菜单，但需要权限
  routes: [
    {
      ...menulist.UAC,
      component: () => import('@/views/dataManagement/user/Uac')
    },
    {
      ...menulist.EventManage,
      component: () => import('@/views/iotPlatform/EventManage')
    },
    {
      ...menulist.MaintDelay,
      component: () => import('@/views/InsureProcess/MaintDelay')
    },
    {
      ...menulist.MaintDelayApprove,
      component: () => import('@/views/InsureProcess/MaintDelayApprove')
    },
    {
      ...menulist.taskOrder,
      component: () => import('@/views/iotPlatform/taskOrder')
    },
    {
      ...menulist.QrList,
      component: () => import('@/views/engineeringServicePlatform/QrCodeList')
    },
    {
      ...menulist.RunningStastic,
      component: () => import('@/views/iotPlatform/RunningStastic')
    },
    {
      ...menulist.AccountManage,
      component: () => import('@/views/dataManagement/accountManage')
    },
    {
      ...menulist.LogsQuery,
      component: () => import('@/views/dataManagement/logsQuery')
    },
    {
      ...menulist.Org,
      component: () =>
        import('@/views/dataManagement/organization/Organization')
    },
    {
      ...menulist.OperUser,
      component: () => import('@/views/dataManagement/organization/OperUser')
    },
    {
      ...menulist.VisitorUser,
      component: () => import('@/views/dataManagement/user/VisitorUser')
    },
    {
      ...menulist.InsuUser,
      component: () => import('@/views/dataManagement/organization/InsuUser')
    },
    {
      ...menulist.AdminUser,
      component: () => import('@/views/dataManagement/organization/AdminUser')
    },
    {
      ...menulist.PropUser,
      component: () => import('@/views/dataManagement/organization/PropUser')
    },
    {
      ...menulist.PropUserSer,
      component: () => import('@/views/dataManagement/organization/PropUser')
    },
    {
      ...menulist.PropUserInsureSer,
      component: () => import('@/views/dataManagement/organization/PropUser')
    },
    {
      ...menulist.InsuInsureUser,
      component: () => import('@/views/dataManagement/organization/InsuUser')
    },
    {
      ...menulist.ServUser,
      component: () => import('@/views/dataManagement/organization/ServeUser')
    },
    {
      ...menulist.SuppUser,
      component: () => import('@/views/dataManagement/organization/SuppUser')
    },
    {
      ...menulist.MarkUser,
      component: () => import('@/views/dataManagement/organization/MarkUser')
    },
    {
      ...menulist.BrandModel,
      component: () => import('@/views/kownManagement/brandmodel/index')
    },
    {
      ...menulist.BrandModelDetail,
      component: () =>
        import('@/views/kownManagement/brandmodel/components/DetailModel')
    },
    {
      ...menulist.SpareParts,
      component: () => import('@/views/kownManagement/spareParts/index')
    },
    {
      ...menulist.Tags,
      component: () => import('@/views/kownManagement/tags/index')
    },
    {
      ...menulist.OperBi,
      component: () => import('@/views/dataPlatform/index')
    },
    {
      ...menulist.CustomerBi,
      component: () => import('@/views/dataPlatform/customerBi2')
    },
    {
      ...menulist.Scule,
      component: () => import('@/views/sculeMangement/index')
    },
    {
      ...menulist.IfaultCode,
      component: () => import('@/views/kownManagement/faultCode/index')
    },
    {
      ...menulist.Iappearance,
      component: () => import('@/views/kownManagement/Iappearance/index')
    },
    {
      ...menulist.IappearWorkItem,
      component: () =>
        import('@/views/kownManagement/Iappearance/indexworkItem')
    },
    {
      ...menulist.Config,
      component: () => import('@/views/configManagement/index')
    },
    {
      ...menulist.ProjectManagement,
      component: () => import('@/views/marketingPlatform/ProjectManagement')
    },
    {
      ...menulist.ProjectManagementInsure,
      component: () => import('@/views/InsureProcess/ProjectManagement')
    },
    {
      ...menulist.OfflineDistribution,
      component: () => import('@/views/iotPlatform/OfflineDistribution')
    },
    {
      ...menulist.offlineTimes,
      component: () => import('@/views/iotPlatform/offlineTimes')
    },
    {
      ...menulist.ContractManagement,
      component: () => import('@/views/marketingPlatform/ContractManagement')
    },
    {
      ...menulist.ContractManagementDetail,
      component: () =>
        import('@/views/marketingPlatform/ContractManagementDetail')
    },
    {
      ...menulist.ContractManagementEditDetail,
      component: () =>
        import('@/views/marketingPlatform/components/editContrac')
    },
    {
      ...menulist.ContractManagementElevatorDetail,
      component: () =>
        import('@/views/marketingPlatform/components/elevatorDetail')
    },
    {
      ...menulist.ProjectManagementDetail,
      component: () =>
        import('@/views/marketingPlatform/ProjectManagementDetail')
    },
    {
      ...menulist.PlanManagement,
      component: () =>
        import('@/views/engineeringServicePlatform/PlanManagement')
    },
    {
      ...menulist.TaskManagement,
      component: () =>
        import('@/views/engineeringServicePlatform/TaskManagement')
    },
    {
      ...menulist.TaskManagementList,
      component: () =>
        import('@/views/engineeringServicePlatform/TaskManagementList')
    },
    {
      ...menulist.TeamManagement,
      component: () =>
        import('@/views/engineeringServicePlatform/TeamManagement')
    },
    {
      ...menulist.TeamManagementBelow,
      component: () =>
        import('@/views/engineeringServicePlatform/TeamManagement')
    },
    // {
    //   ...menulist.TeamManagementSer,
    //   component: () =>
    //     import('@/views/engineeringServicePlatform/TeamManagement')
    // },
    {
      ...menulist.TeamUserEngEdit,
      component: () =>
        import('@/views/engineeringServicePlatform/components/editTeamUser')
    },
    {
      ...menulist.TeamUserEdit,
      component: () =>
        import('@/views/engineeringServicePlatform/components/editTeamUser')
    },
    {
      ...menulist.MaintenanceCompany,
      component: () => import('@/views/SupplyChainPlatform/MaintenanceCompany')
    },
    {
      ...menulist.InsureMaintenanceCompany,
      component: () => import('@/views/InsureProcess/MaintenanceCompany')
    },
    {
      ...menulist.InsuranceCompany,
      component: () => import('@/views/SupplyChainPlatform/InsuranceCompany')
    },
    {
      ...menulist.InsuranceInsureCompany,
      component: () => import('@/views/InsureProcess/InsuranceCompany')
    },
    {
      ...menulist.SuppCompany,
      component: () => import('@/views/SupplyChainPlatform/SuppCompany')
    },
    {
      ...menulist.AccessoriesList,
      component: () => import('@/views/SupplyChainPlatform/AccessoriesList')
    },
    {
      ...menulist.Material,
      component: () => import('@/views/SupplyChainPlatform/Material')
    },
    {
      ...menulist.ElevatorConfiguration,
      component: () => import('@/views/iotPlatform/ElevatorConfiguration')
    },
    {
      ...menulist.LogManagement,
      component: () => import('@/views/iotPlatform/LogManagement')
    },
    {
      ...menulist.ElevatorBiConfiguration,
      component: () => import('@/views/iotPlatform/ElevatorConfiguration')
    },
    {
      ...menulist.RunningData,
      component: () => import('@/views/iotPlatform/RunningData')
    },
    {
      ...menulist.RunningData2,
      component: () => import('@/views/iotPlatform/RunningData')
    },
    {
      ...menulist.LogBiManagement,
      component: () => import('@/views/iotPlatform/LogManagement')
    },
    {
      ...menulist.PaaSConfiguration,
      component: () => import('@/views/iotPlatform/PaaSConfiguration')
    },
    {
      ...menulist.Component,
      component: () =>
        import('@/views/kownManagement/spareParts/ComponentIndex')
    },
    {
      ...menulist.IfaultWorkItem,
      component: () => import('@/views/kownManagement/faultCode/indexworkItem')
    },
    {
      ...menulist.MaintenanceCompanyEdit,
      component: () =>
        import('@/views/SupplyChainPlatform/components/editMaintenanceCompany')
    },
    {
      ...menulist.MaintenanceCompanyInsureEdit,
      component: () =>
        import('@/views/InsureProcess/components/editMaintenanceCompany')
    },
    {
      ...menulist.InsuCompany,
      component: () => import('@/views/marketingPlatform/PropCompany')
    },
    {
      ...menulist.ProCompany,
      component: () => import('@/views/InsureProcess/PropCompany')
    },
    {
      ...menulist.Iupkeep,
      component: () => import('@/views/MaintenanceManual/index')
    },
    {
      ...menulist.ProjectAuth,
      component: () => import('@/views/MaintenanceManual/ProjectRelationPreson')
    },
    {
      ...menulist.UserProjectAuth,
      component: () => import('@/views/MaintenanceManual/PresonRelationProject')
    },
    {
      ...menulist.PreAnalysis,
      component: () => import('@/views/engineeringServicePlatform/PreAnalysis')
    },
    {
      ...menulist.Workbench,
      component: () => import('@/views/servicePlatform/index')
    },

    {
      ...menulist.InsuranceReport,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.CustomReport,
      component: () => import('@/views/BI/customerReport/CustomerReport')
    },
    {
      ...menulist.EngineeringServicesReport,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.IotReport,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.ScmReport,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.StaffReport,
      component: () => import('@/views/BI/index')
    },

    {
      ...menulist.CallRecord,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.EmergencyManagement,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.AlarmReceivingManagement,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.ComplaintManagement,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.ConsultingManagement,
      component: () => import('@/views/BI/index')
    },
    {
      ...menulist.ElevatorProjectConfiguration,
      component: () =>
        import('@/views/iotPlatform/ElevatorProjectConfiguration')
    },
    {
      ...menulist.ElevManage,
      component: () => import('@/views/MaintenanceManual/ElevatorList')
    },
    {
      ...menulist.ElevManageCusotom,
      component: () => import('@/views/MaintenanceManual/ElevatorListCustom')
    },
    {
      ...menulist.ConstManage,
      component: () => import('@/views/MaintenanceManual/Constype')
    },

    {
      ...menulist.AndroidVersion,
      component: () => import('@/views/MaintenanceManual/AppVersion')
    },
    {
      ...menulist.VersionHelmet,
      component: () => import('@/views/MaintenanceManual/AppHelmetVersion')
    },
    {
      ...menulist.IOSVersion,
      component: () => import('@/views/MaintenanceManual/IOSVersion')
    },
    {
      ...menulist.SysControllor,
      component: () => import('@/views/MaintenanceManual/SysController')
    }, //TaskInfo TaskMedical TaskCleanUpkeep TaskRepairUpkeep TaskInstallIot TaskRegularUpkeep TaskRegularUpkeep TaskCallRepair TaskEmergency
    {
      ...menulist.TaskInfo,
      component: () => import('@/views/taskManagement/TaskInfo')
    },
    {
      ...menulist.TaskMedical,
      component: () => import('@/views/taskManagement/TaskMedical')
    },
    {
      ...menulist.TaskCleanUpkeep,
      component: () => import('@/views/taskManagement/TaskCleanUpkeep')
    },
    {
      ...menulist.TaskRepairUpkeep,
      component: () => import('@/views/taskManagement/TaskRepairUpkeep')
    },
    {
      ...menulist.TaskInstallIot,
      component: () => import('@/views/taskManagement/TaskInstallIot')
    },
    {
      ...menulist.TaskRegularUpkeep,
      component: () => import('@/views/taskManagement/TaskRegularUpkeep')
    },
    {
      ...menulist.TaskCallRepair,
      component: () => import('@/views/taskManagement/TaskCallRepair')
    },
    {
      ...menulist.TaskEmergency,
      component: () => import('@/views/taskManagement/TaskEmergency')
    },

    {
      ...menulist.TaskCallRepair,
      component: () => import('@/views/taskManagement/TaskCallRepair')
    },
    {
      ...menulist.OrderInfo,
      component: () => import('@/views/orderManagement/OrderInfo')
    },
    {
      ...menulist.OrderMedical,
      component: () => import('@/views/orderManagement/OrderMedical')
    },
    {
      ...menulist.OrderCleanUpkeep,
      component: () => import('@/views/orderManagement/OrderCleanUpkeep')
    },
    {
      ...menulist.OrderRepairUpkeep,
      component: () => import('@/views/orderManagement/OrderRepairUpkeep')
    },
    {
      ...menulist.OrderInstallIot,
      component: () => import('@/views/orderManagement/OrderInstallIot')
    },
    {
      ...menulist.OrderRegularUpkeep,
      component: () => import('@/views/orderManagement/OrderRegularUpkeep')
    },
    {
      ...menulist.OrderCallRepair,
      component: () => import('@/views/orderManagement/OrderCallRepair')
    },
    {
      ...menulist.OrderEmergency,
      component: () => import('@/views/orderManagement/OrderEmergency')
    },
    {
      ...menulist.BiTestPage,
      component: () => import('@/views/BI/BiConf')
    },

    {
      ...menulist.bigDataBrokenPredictDay,
      component: () => import('@/views/dataHouse/elevatorForecastDamage')
    },
    {
      ...menulist.bigDataLoseFloorDay,
      component: () => import('@/views/dataHouse/elevatorForecastDamageFloor')
    },
    {
      ...menulist.bigDataLotMonthFloor,
      component: () => import('@/views/dataHouse/elevatorRunningstateDoorMonth')
    },
    {
      ...menulist.bigDataRunStatisticDay,
      component: () => import('@/views/dataHouse/elevatorRunningDayTotal')
    },
    {
      ...menulist.bigDataStateDay,
      component: () => import('@/views/dataHouse/elevatorEveryDay')
    },
    {
      ...menulist.bigDataPassengersDay,
      component: () => import('@/views/dataHouse/elevatorPassengersDay')
    },
    {
      ...menulist.noPaperPage,
      component: () => import('@/views/MaintenanceManual/NoPaper')
    },
    {
      ...menulist.noPaperPageLog,
      component: () => import('@/views/MaintenanceManual/NoPaperLog')
    },
    {
      ...menulist.noPaperPageCustomLog,
      component: () => import('@/views/MaintenanceManual/NoPaperLog')
    },
    {
      ...menulist.noPaperPagecqupload,
      component: () => import('@/views/MaintenanceManual/NoPaperCqUpload')
    },
    {
      ...menulist.issueList,
      component: () => import('@/views/expertPlatform/issueList')
    },
    {
      ...menulist.stoprecord,
      component: () => import('@/views/MaintenanceManual/StopRecords')
    },
    {
      ...menulist.dynamicWorkIt,
      component: () => import('@/views/expertPlatform/DynamicWorkItem')
    },
    {
      ...menulist.resetPartInstRunData,
      component: () => import('@/views/expertPlatform/ResetElevatorList')
    },
    {
      ...menulist.BICommentArea,
      component: () => import('@/views/expertPlatform/BICommentArea')
    },
    {
      ...menulist.serviceReport,
      component: () => import('@/views/expertPlatform/ServiceReport')
    },
    {
      ...menulist.Helmet,
      component: () => import('@/views/MaintenanceManual/Helmet')
    },
    {
      ...menulist.ExpertSuggest,
      component: () => import('@/views/expertPlatform/ExpertAdvice')
    },

    {
      ...menulist.ReloadData,
      component: () =>
        import('@/views/MaintenanceManual/ReloadMemory/ReloadData')
    },
    {
      ...menulist.ReloadParam,
      component: () =>
        import('@/views/MaintenanceManual/ReloadMemory/ReloadParam')
    },
    {
      ...menulist.ReloadConfig,
      component: () =>
        import('@/views/MaintenanceManual/ReloadMemory/ReloadConfig')
    },
    {
      ...menulist.FeedBack,
      component: () => import('@/views/expertPlatform/FeedBack')
    },

    {
      ...menulist.PropCompUserAuth,
      component: () =>
        import(
          '@/views/MaintenanceManual/AuthorBindingPerson/proCompanyRelationPreson'
        )
    },
    {
      ...menulist.UserPropCompAuth,
      component: () =>
        import(
          '@/views/MaintenanceManual/AuthorBindingPerson/PresonRelationproCompany'
        )
    },
    {
      ...menulist.MaintCompUserAuth,
      component: () =>
        import(
          '@/views/MaintenanceManual/AuthorBindingPerson/maintCompanyRelationPreson'
        )
    },
    {
      ...menulist.UserMaintCompAuth,
      component: () =>
        import(
          '@/views/MaintenanceManual/AuthorBindingPerson/PresonRelationmaintCompany'
        )
    },
    {
      ...menulist.InsuCompUserAuth,
      component: () =>
        import(
          '@/views/MaintenanceManual/AuthorBindingPerson/InsuCompanyRelationPreson'
        )
    },
    {
      ...menulist.UserInsuCompAuth,
      component: () =>
        import(
          '@/views/MaintenanceManual/AuthorBindingPerson/PresonRelationInsuCompany'
        )
    },
    {
      ...menulist.InsureList,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureManagementList,
      component: () => import('@/views/InsureProcess/InsureListSelf')
    },
    {
      ...menulist.InsureInsuList,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureOnSite,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.Insurequotation,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsurequotationTLAudit,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureassessLoss,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsurefinishTLComfirm,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsuresettleAudit,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsurePayComfirm,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.Insurefiling,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureSubmitPlan,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureAudit,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureTLAudit,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureInuserAudit,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureAllList,
      component: () => import('@/views/InsureProcess/InsureList')
    },
    {
      ...menulist.InsureDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureManagementListDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureInsuDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.PropertyBI,
      component: () => import('@/views/dataPlatform/propertyBI/index')
    },
    {
      ...menulist.InsureBI,
      component: () => import('@/views/dataPlatform/insureBI/index')
    },
    {
      ...menulist.EngineeringBI,
      component: () => import('@/views/dataPlatform/engineeringBI/index')
    },

    {
      ...menulist.InsureOnSiteDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsurequotationDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsurequotationTLAuditDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureassessLossDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsurefinishTLComfirmDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsuresettleAuditDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsurePayComfirmDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsurefilingDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureSubmitPlanDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureAuditDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureTLAuditDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureInuserAuditDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.InsureAllListDetail,
      component: () => import('@/views/InsureProcess/InsureDetail')
    },
    {
      ...menulist.RunningEventPushLogs,
      component: () => import('@/views/MaintenanceManual/RunEventPushList')
    },
    {
      ...menulist.EmergencyOrderServerManage,
      component: () => import('@/views/servicePlatform/OrderEmergency')
    },

    {
      ...menulist.AnualInspectList,
      component: () => import('@/views/servicePlatform/AnualInspectList')
    },
    {
      ...menulist.PartInstReplaceList,
      component: () => import('@/views/servicePlatform/PartInstReplaceList')
    },
    {
      ...menulist.Alarmlog,
      component: () => import('@/views/MaintenanceManual/Alarmlog')
    },
    {
      ...menulist.ProjectLife,
      component: () => import('@/views/MaintenanceManual/ProjectLife')
    },
    {
      ...menulist.AlarmlogManagement,
      component: () => import('@/views/InsureProcess/Alarmlog')
    },
    {
      ...menulist.PassByEngine,
      component: () => import('@/views/engineeringServicePlatform/OrderList')
    },
    {
      ...menulist.CallRepairPro,
      component: () => import('@/views/InsureProcess/OrderTranformProList')
    },
    {
      ...menulist.PassByPropUser,
      component: () => import('@/views/InsureProcess/TaskEvaluateList')
    },
    {
      ...menulist.AnnualInspect,
      component: () => import('@/views/InsureProcess/AnualInspectList')
    }
  ]
}
