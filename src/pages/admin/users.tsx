import DataTable from "@/components/data-table";
import Layout from "@/components/layout-admin";
import { TUser } from "@/utils/apis/users/type";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";

export default function Users() {
  const [datas] = useState<TUser[]>([
    {
      fullname: "Muhammad Bagir",
      email: "bagir3008@gmail.com",
      handphone: "085912345678",
      password: "4545",
      ktp: "3573052004030001",
      npwp: "123456789003000",
    },
    {
      fullname: "Muhammad Bagir",
      email: "bagir3008@gmail.com",
      handphone: "085912345678",
      password: "4545",
      ktp: "3573052004030001",
      npwp: "123456789003000",
    },
  ]);

  const columns = useMemo<ColumnDef<TUser>[]>(
    () => [
      {
        header: "No",
        accessorKey: "no",
        cell: (info) => info.row.index + 1,
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Fullname",
        accessorKey: "fullname",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Email",
        accessorKey: "email",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "No HP",
        accessorKey: "handphone",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "No KTP",
        accessorKey: "ktp",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
      },
      {
        header: "NPWP",
        accessorKey: "npwp",
        cell: (info) => String(info.getValue()),
        footer: (props) => props.column.id,
        size: 80,
      },
      {
        header: "Status",
        id: "status",
        cell: () => (
          <div className="flex gap-3">
            <p className="">Pending</p>
          </div>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Approval",
        id: "approval",
        cell: () => (
          <div className="flex gap-3">
            <UserCheck className="text-green-700" />
            <UserX className="text-red-700" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
      {
        header: "Action",
        id: "action",
        cell: () => (
          <div className="flex gap-3">
            <Edit className="text-blue-700" />
            <Trash2 className="text-red-700" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 50,
      },
    ],
    []
  );
  return (
    <Layout>
      <div className="w-full text-xl font-semibold mb-4">
        <p>Users</p>
      </div>
      <div className="w-full">
        <DataTable columns={columns} datas={datas} />
      </div>
    </Layout>
  );
}