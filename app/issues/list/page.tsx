import { IssueStatusBadge, Link } from "@/app/components";
import prisma from "@/prisma/client";
import { Table } from "@radix-ui/themes";
import IssueActions from "./IssueActions";
import { Status } from "@prisma/client";

interface Props {
  searchParams: { status: Status };
}

async function IssuePage({ searchParams }: Props) {
  const statuses = Object.values(Status);
  const ststus = statuses.includes(searchParams.status) ? searchParams.status : undefined
  const issues = await prisma.issue.findMany({
    where:{
      ststus
    }
  });

  return (
    <div>
      <IssueActions />
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.Cell>Issue</Table.Cell>
            <Table.Cell className="hidden md:table-cell">Status</Table.Cell>
            <Table.Cell className="hidden md:table-cell">Created</Table.Cell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {issues.map((issue) => (
            <Table.Row key={issue.id}>
              <Table.Cell>
                <Link href={`/issues/${issue.id}`}>{issue.title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={issue.ststus} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={issue.ststus} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {issue.createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}

export const dynamic = "force-dynamic";

export default IssuePage;
