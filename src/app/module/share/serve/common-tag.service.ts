import { Tag, TagType } from './../model/common.model';
import { Injectable } from '@angular/core';
import { TagTitle } from '../config/constant.config';

@Injectable({
  providedIn: 'root'
})
export class CommonTagService {

  constructor() { }
    /**
     * 显示所有标签
     * @param tags 
     */
    showAllTags(tags: Tag[]) {
      tags.forEach(el => el.show = true)
    }
    findTagsIndex(tags: Tag[], key: string) {
      return tags.findIndex(el => el.key === key)
    }
    /**
     * 更新标签
     * @param Tag 标签的key和显示
     * @param type 类型
     * @param tags 原始数组
     */
    updateTags(
      { key, title }: { key: string; title: string },
      type: TagType,
      tags: Tag[]
    ) {
      const index = tags.findIndex((el) => el.type === type)
      if (index !== -1) {
        tags.splice(index, 1);
      }
      tags.push({
        key,
        title: `${TagTitle[type]}: ${title}`,
        show: true,
        type,
      })
    }
    /**
     * 隐藏所有标签
     * @param tags 
     */
    hideTags(tags: Tag[]) {
      tags.forEach(el => el.show = false)
    }
    /**
     * 删除标签
     * @param key 
     * @param tags 
     */
    tagDelete(key: string, type: string, tags: Tag[]) {
      tags.splice(tags.findIndex(item => item.key === key && item.type === type), 1)
    }
}
