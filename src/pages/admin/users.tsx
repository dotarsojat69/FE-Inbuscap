import DataTable from "@/components/data-table";
import Layout from "@/components/layout-admin";
import { IVerif, VerifUser } from "@/utils/apis/users/type";
import { ColumnDef } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { Edit, Trash2, UserCheck, UserX } from "lucide-react";
import { approveUser, getVerifications } from "@/utils/apis/users/api";
import CustomAlert from "@/components/custom-alert";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Users() {
  const [datas, setDatas] = useState<IVerif[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [fullname, setFullname] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchDataReqVerification();
  }, [searchParams]);

  const fetchDataReqVerification = async () => {
    try {
      const query = Object.fromEntries([...searchParams]);
      const result = await getVerifications({ ...query });

      setDatas(result.data);
    } catch (error) {}
  };

  const handleApproval = async (user_id: number, body: VerifUser) => {
    try {
      const result = await approveUser(user_id, body);

      toast({
        description: result.message,
      });

      if (body.is_active === 1) {
        setShowApproveDialog(!showApproveDialog);
      }

      if (body.is_active === 2) {
        setShowRejectDialog(!showRejectDialog);
      }
      navigate("/admin/users");

      const datas = await getVerifications();
      setDatas(datas.data);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong.",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const columns = useMemo<ColumnDef<IVerif>[]>(
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
        header: "Foto KTP",
        accessorKey: "photo_ktp",
        cell: (info) => {
          return info.row.original.photo_ktp ? (
            <a
              className="text-sky-700 font-medium underline"
              href={info.row.original.photo_ktp}
              target="_blank"
              id="link-img-ktp"
            >
              KTP Image
            </a>
          ) : (
            <p className="text-red-500 font-medium">No Image</p>
          );
        },
        footer: (props) => props.column.id,
        size: 200,
      },

      {
        header: "Foto NPWP",
        accessorKey: "photo_npwp",
        cell: (info) => {
          return info.row.original.photo_npwp ? (
            <a
              className="text-sky-700 font-medium underline"
              href={info.row.original.photo_npwp}
              target="_blank"
              id="link-img-npwp"
            >
              NPWP Image
            </a>
          ) : (
            <p className="text-red-500 font-medium">No Image</p>
          );
        },
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Foto Selfie",
        accessorKey: "photo_selfie",
        cell: (info) => {
          return info.row.original.photo_selfie ? (
            <a
              className="text-sky-700 font-medium underline"
              href={info.row.original.photo_selfie}
              target="_blank"
              id="link-img-selfie"
            >
              Selfie Image
            </a>
          ) : (
            <p className="text-red-500 font-medium">No Image</p>
          );
        },
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "KTP",
        accessorKey: "ktp",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "NPWP",
        accessorKey: "npwp",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "No HP",
        accessorKey: "phone",
        cell: (info) => info.row.original.handphone,
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Status",
        id: "is_active",
        cell: (info) => {
          const value = info.row.original.is_active;
          if (value === 0) {
            return (
              <p className="text-yellow-600 font-semibold bg-yellow-100 rounded-full text-center px-3 py-1">
                Pending
              </p>
            );
          }
          if (value === 1) {
            return (
              <p className="text-primary font-semibold bg-green-100 rounded-full text-center px-3 py-1">
                Approved
              </p>
            );
          }
          if (value === 2) {
            return (
              <p className="text-red-500 font-semibold bg-red-100 rounded-full text-center px-3 py-1">
                Rejected
              </p>
            );
          }
        },
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Approval",
        id: "approval",
        cell: (info) => {
          const value = info.row.original.is_active;
          if (value === 0) {
            return (
              <div className="flex gap-3">
                <UserCheck
                  className="text-green-700"
                  onClick={() => {
                    setFullname(info.row.original.fullname);
                    setUserId(info.row.original.id);
                    setShowApproveDialog(!showApproveDialog);
                  }}
                  id="btn-approve"
                />
                <UserX
                  className="text-red-700"
                  onClick={() => {
                    setFullname(info.row.original.fullname);
                    setUserId(info.row.original.id);
                    setShowRejectDialog(!showRejectDialog);
                  }}
                  id="btn-reject"
                />
              </div>
            );
          }

          if (value === 1) {
            return (
              <div className="flex gap-3">
                <UserX
                  className="text-red-700 mx-auto"
                  onClick={() => {
                    setFullname(info.row.original.fullname);
                    setUserId(info.row.original.id);
                    setShowRejectDialog(!showRejectDialog);
                  }}
                  id="btn-reject"
                />
              </div>
            );
          }

          if (value === 2) {
            return (
              <div className="flex gap-3">
                <UserCheck
                  className="text-green-700 mx-auto"
                  onClick={() => {
                    setFullname(info.row.original.fullname);
                    setUserId(info.row.original.id);
                    setShowApproveDialog(!showApproveDialog);
                  }}
                  id="btn-approve"
                />
              </div>
            );
          }
        },
        footer: (props) => props.column.id,
        size: 200,
      },
      {
        header: "Action",
        id: "action",
        cell: () => (
          <div className="flex gap-3">
            <Edit className="text-blue-700" id="btn-edit-user" />
            <Trash2 className="text-red-700" id="btn-delete-user" />
          </div>
        ),
        footer: (props) => props.column.id,
        size: 200,
      },
    ],
    []
  );

  return (
    <Layout>
      <div className="w-full flex justify-between text-xl font-semibold mb-4">
        <p>Users</p>
        <Select
          onValueChange={(value) => {
            searchParams.set("status", value);
            setSearchParams(searchParams);
          }}
        >
          <SelectTrigger className="w-[180px]" id="select-status-user">
            <SelectValue placeholder="Pending" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0" id="select-pending">
              Pending
            </SelectItem>
            <SelectItem value="1" id="select-approve">
              Approved
            </SelectItem>
            <SelectItem value="2" id="select-reject">
              Rejected
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full h-[500px]">
        <DataTable columns={columns} datas={datas} />
      </div>
      <CustomAlert
        open={showApproveDialog}
        title={`Kamu Yakin Untuk Menyetujui "${fullname}" ?`}
        description="Setelah pengguna disetujui, maka pengguna dapat membuat bisnis ataupun berinvestasi di bisnis orang lain"
        onCancel={() => {
          setShowApproveDialog(!showApproveDialog);
        }}
        onAction={() => handleApproval(userId!, { is_active: 1 })}
      />

      <CustomAlert
        open={showRejectDialog}
        title={`Kamu Yakin Untuk Me-reject "${fullname}" ?`}
        description="Setelah pengguna di-reject, maka pengguna tidak dapat membuat bisnis ataupun berinvestasi di bisnis orang lain"
        onCancel={() => {
          setShowRejectDialog(!showRejectDialog);
        }}
        onAction={() => handleApproval(userId!, { is_active: 2 })}
      />
    </Layout>
  );
}
