"use server";
import { db } from "@/lib/db";
import {
  Branch,
  DepartmentBranch,
  Prisma,
  Recommendation,
  University,
  User,
  UserRole,
} from "@prisma/client";
import { Session } from "next-auth";
import { authOptions } from "@/app/option";
interface UserInfo {
  session: Session | null;
  role: {
    role: string | null;
  } | null;
}

export const userRole = async (email?: string | null | undefined) => {
  if (email) {
    const roleData = await db.user.findFirst({
      where: {
        email,
      },
      select: {
        role: true,
      },
    });

    const role = roleData?.role;
    return role;
  } else {
    const role = "unauthenticated";
    return role;
  }
};

export const undateUniversity = async (id: string, data: University) => {
  if (id && data) {
    const res = await db.university.update({
      where: {
        id,
      },
      data,
    });
    return res.id;
  } else {
    return;
  }
};
export const fetchDpt = async () => {
  const allDpt = await db.department.findMany({
    select: {
      shortName: true,
      id: true,
    },
  });
  return allDpt;
};
export const makeBatch = async (data: any) => {
  const { name, address, helpline, selected, id } = data;
  const createdBranch = await db.branch.create({
    data: {
      name,
      address,
      helpline,
      universityId: id,
      departments: {
        create: selected.map((dpt: any) => ({
          department: { connect: { id: dpt.value } },
          cost: 0,
          internship_opportunities: "UNAVAILABLE",
          campus_size: "SMALL",
          research_facilities: "POOR",
          qualification: ["MASTERS"],
        })),
      },
    },
  });

  return createdBranch;
};
export const deleteBranch = async (id: string) => {
  await db.branch.delete({
    where: {
      id,
    },
  });
  return;
};

export const modifyDepartment = async (id: string, data: any) => {
  await db.departmentBranch.update({
    where: {
      id,
    },
    data,
  });
};
export const FeaturedUniversityEdit = async (
  id: string,
  university_name: string,
  image_url: string,
  href: string | null
) => {
  const response = await db.featuredUniversity.update({
    where: {
      id: id,
    },
    data: {
      university_name,
      image_url,
      href,
    },
  });
  return response;
};
export const FeaturedUniversityAdd = async (
  university_name: string,
  image_url: string,
  href: string | null
) => {
  const response = await db.featuredUniversity.create({
    data: {
      university_name,
      image_url,
      href,
    },
  });
  return response;
};

export const FeaturedUniversityDelete = async (id: string) => {
  const response = await db.featuredUniversity.delete({
    where: { id },
  });
};

export const BannerAdd = async (
  title: string,
  image_url: string,
  href: string | null
) => {
  const response = await db.carousel.create({
    data: {
      title,
      image_url,
      href,
    },
  });
  return response;
};

export const BannerDelete = async (id: string) => {
  const response = await db.featuredUniversity.delete({
    where: { id },
  });
};
export const UpdateUserRole = async (id: string, role: any) => {
  const response = await db.user.update({
    where: { id },
    data: {
      role,
    },
  });
  return response;
};
import { getServerSession } from "next-auth";

export const userInfo = async (): Promise<UserInfo> => {
  let role = null;

  const session = await getServerSession(authOptions);
  if (session) {
    role = await db.user.findFirst({
      where: { email: session?.user?.email as string },
      select: { role: true },
    });
  }

  return { session, role };
};

export const userDetail = async () => {
  let details = null;

  const session = await getServerSession(authOptions);
  if (session) {
    details = await db.user.findFirst({
      where: { email: session?.user?.email as string },
      include: {
        Bookmark: true,
      },
    });
  }

  return { details };
};

export const allDept = async () => {
  const dpt = await db.department.findMany({
    select: {
      id: true,
      shortName: true,
    },
  });
  return dpt;
};
export const universitiesWithDepartmentId = async (id: string) => {
  const universitiesWithDepartmentId = await db.university.findMany({
    where: {
      branches: {
        some: {
          departments: {
            some: {
              department: {
                id,
              },
            },
          },
        },
      },
    },
    select: {
      id: true,
      university_name: true,
    },
  });

  return universitiesWithDepartmentId;
};

export const CompareUniversity = async (choosedDpt: string, data: any) => {
  const universityIds = data.map((university: any) => university.value);

  const universitiesWithDepartment = await db.university.findMany({
    where: {
      id: {
        in: universityIds,
      },
    },
    include: {
      branches: {
        include: {
          departments: {
            where: {
              departmentId: choosedDpt,
            },
            orderBy: {
              cost: "asc",
            },
            include: {
              department: true,
            },
          },
        },
      },
    },
  });
  return universitiesWithDepartment;
};

export const CreateBookmark = async (
  bookmark_title: string,
  choosedDepartmentId: string,
  selectedUniversityId: string[],
  userEmail: string
) => {
  if (
    bookmark_title &&
    choosedDepartmentId &&
    selectedUniversityId &&
    userEmail
  ) {
    try {
      const res = await db.bookmark.create({
        data: {
          userEmail,
          selectedUniversityId,
          choosedDepartmentId,
          bookmark_title,
        },
      });
      return res;
    } catch (error: unknown) {
      return { error: "Something went wrong" };
    }
  }
};

export const CreateFeedback = async (
  email: string,
  subject: string,
  msg: string
) => {
  const res = await db.feedback.create({
    data: {
      email,
      subject,
      msg,
    },
  });
  return res;
};

export const deleteArticle = async (id: string) => {
  const res = await db.article.delete({
    where: {
      id,
    },
  });
  return res;
};
export const deleteBookmark = async (id: string) => {
  const res = await db.bookmark.delete({
    where: {
      id,
    },
  });
  return res;
};
export const VisibilityBookmark = async (id: string, is_visible: boolean) => {
  const res = await db.bookmark.update({
    where: {
      id,
    },
    data: {
      is_visible,
    },
  });
  return res;
};

export const fetchArticle = async (id: string) => {
  const res = await db.article.findUnique({
    where: {
      id,
    },
  });
  return res;
};

export const updateArticle = async (
  id: string,
  title: string,
  introduction: string,
  imageUrl: string,
  content: string
) => {
  const res = await db.article.update({
    where: {
      id,
    },
    data: {
      title,
      introduction,
      imageUrl,
      content,
    },
  });
  return res;
};

export const CompareUniversityShow = async (
  choosedDpt: string,
  ids: string[]
) => {
  const universitiesWithDepartment = await db.university.findMany({
    where: {
      id: {
        in: ids,
      },
    },
    include: {
      branches: {
        include: {
          departments: {
            where: {
              departmentId: choosedDpt,
            },
            include: {
              department: true,
            },
          },
        },
      },
    },
  });
  return universitiesWithDepartment;
};

export const barChart = async () => {
  const allDpt = await db.department.findMany({
    include: {
      branches: true,
    },
  });

  allDpt.sort((a, b) => b.branches.length - a.branches.length);
  const top10Dpt = allDpt.slice(0, 10);
  return top10Dpt;
};

export const ReviewUniversity = async (
  userEmail: string,
  universityId: string,
  recommendation: Recommendation,
  comment: string
) => {
  const res = await db.review.create({
    data: {
      userEmail,
      universityId,
      recommendation,
      comment,
    },
  });
  return res;
};

export const handleDelete = async (id: string) => {
  const res = await db.review.delete({
    where: {
      id,
    },
  });
  return res;
};

export const fetchUniversity = async () => {
  const res = await db.university.findMany({
    orderBy: {
      rank: "asc",
    },
  });
  return res;
};

export const addRepresentative = async (
  universityId: string,
  loggedinEmail: string,
  supportingEmail: string,
  university_logo: string
) => {
  await db.university.update({
    where: {
      id: universityId,
    },
    data: {
      hasRepresentative: true,
    },
  });

  const res = await db.representative.create({
    data: {
      loggedinEmail,
      supportingEmail,
      universityId,
      university_logo,
    },
  });
  return res;
};

export const deleteRepresentation = async (id: string) => {
  await db.university.update({
    where: {
      id,
    },
    data: {
      hasRepresentative: false,
    },
  });

  const res = await db.representative.deleteMany({
    where: {
      universityId: id,
    },
  });
  return res;
};

export const createQuestion = async (
  q: string,
  userEmail: string,
  universityId: string
) => {
  const res = await db.question.create({
    data: {
      question: q,
      userEmail,
      universityId,
    },
  });
  return res;
};

export const createAnswer = async (id: string, answer: string) => {
  const res = await db.question.update({
    where: {
      id,
    },
    data: {
      answer,
    },
  });
};
