import {
  FileSearchOutlined,
  UnorderedListOutlined,
  HomeOutlined,
  TeamOutlined,
  ToolOutlined,
  UserOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    title: "Home", // navigation title
    key: "/home", // pathname
    icon: HomeOutlined, // icon
    isPublic: true,
  },
  {
    title: "Candidates",
    key: "/candidates",
    icon: TeamOutlined,
    children: [
      // Sub-menu
      {
        title: "Advanced Search",
        key: "/search",
        icon: FileSearchOutlined,
      },
      {
        title: "Job List",
        key: "/joblist",
        icon: UnorderedListOutlined,
      },
      {
        title: "Candidate List",
        key: "/candidate",
        icon: UserOutlined,
      },
    ],
  },
  {
    title: "Role Setting",
    key: "/role",
    icon: ToolOutlined,
  },
];

export default menuList;
