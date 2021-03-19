import api from "..";

/**
 *
 * 
 */
interface IProject {
    name: string;
    description: string;
    createrId: string
}

interface IPage {
    currentPage: number;
    pageSize: number;
}

/**新建文章 */
export function addProjectApi(data: IProject) {
    return api({
        method: "POST",
        url: "/project/create",
        data: data,
    });
}

/**更新文章 */
export function updataProjectApi(id: string, data: IProject) {
    return api({
        method: "POST",
        url: "/project/alter/" + id,
        data: data,
    });
}

/**获取一篇文章 */
export function findProjectByIdApi(id: string) {
    return api({
        method: "POST",
        url: "/project/find/" + id
    });
}



/*查询所有分类 */
export function findAllKindApi() {
    return api({
        method: "GET",
        url: "/kind/findAll"
    });
}

/*删除文章 */
export function removeProjectApi(id: string) {
    return api({
        method: "POST",
        url: "/project/delete/" + id
    });
}



/*按分类查询文章(fenye)*/
export function findProjectByKindPageApi(kindId: string, data: IPage) {
    return api({
        method: "POST",
        url: "/project/findProjectByKindPage/" + kindId,
        data: data
    });
}

