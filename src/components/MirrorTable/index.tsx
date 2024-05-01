import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MirrorSyncList } from "@/types/sync";
import dayjs from "dayjs";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";
const getSyncData = async () => {
  "use server";
  const res = await axios.get(
    "https://gist.githubusercontent.com/MaxtuneLee/fefea9647da5b8ac9ebbc08399d9f68a/raw/9dac9e9a745373d12e3cd7008db4e63462baeb7a/mirrordsync.json",
  );
  console.log(res);
  return res.data;
};
const getSyncStatusVariant = (status: string) => {
  switch (status) {
    case "success":
      return "success";
    case "error":
      return "destructive";
    case "syncing":
      return "syncing";
    default:
      return "default";
  }
};
const MirrorTable = async () => {
  const data: MirrorSyncList = await getSyncData();
  const time = dayjs();
  console.log(data);
  return (
    <>
      <Table className="w-full">
        <TableCaption>
          更新时间: {time.format("YYYY-MM-DD HH:mm:ss")}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">名称</TableHead>
            <TableHead className="w-[150px]">状态</TableHead>
            <TableHead>大小</TableHead>
            <TableHead>上次更新时间</TableHead>
            <TableHead>下次更新时间</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => {
            return (
              <TableRow key={item.name}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge variant={getSyncStatusVariant(item.status)}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell className="">
                  {dayjs(item.last_update).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
                <TableCell className="">
                  {dayjs(item.next_schedule).format("YYYY-MM-DD HH:mm:ss")}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
export const SkeletonTable = () => {
  return (
    <Table className="w-full">
      <TableCaption>更新时间: 2021-09-27 12:00:00</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">名称</TableHead>
          <TableHead className="w-[150px]">状态</TableHead>
          <TableHead>大小</TableHead>
          <TableHead>上次更新时间</TableHead>
          <TableHead>下次更新时间</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 20 }).map((_, index) => {
          return (
            <TableRow key={index}>
              <TableCell className="font-medium">
                <Skeleton className="w-3/4 h-4  rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-3/4 h-4  rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-3/4 h-4  rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-3/4 h-4  rounded" />
              </TableCell>
              <TableCell>
                <Skeleton className="w-3/4 h-4  rounded" />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default MirrorTable;
