declare namespace API {
  type BaseResponseBoolean_ = {
    code?: number;
    data?: boolean;
    message?: string;
  };

  type BaseResponseInt_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponseListSpaceLevel_ = {
    code?: number;
    data?: SpaceLevel[];
    message?: string;
  };

  type BaseResponseLoginUserVO_ = {
    code?: number;
    data?: LoginUserVO;
    message?: string;
  };

  type BaseResponseLong_ = {
    code?: number;
    data?: number;
    message?: string;
  };

  type BaseResponsePagePicture_ = {
    code?: number;
    data?: PagePicture_;
    message?: string;
  };

  type BaseResponsePagePictureVO_ = {
    code?: number;
    data?: PagePictureVO_;
    message?: string;
  };

  type BaseResponsePageSpace_ = {
    code?: number;
    data?: PageSpace_;
    message?: string;
  };

  type BaseResponsePageSpaceVO_ = {
    code?: number;
    data?: PageSpaceVO_;
    message?: string;
  };

  type BaseResponsePageUserVO_ = {
    code?: number;
    data?: PageUserVO_;
    message?: string;
  };

  type BaseResponsePictureTagCategory_ = {
    code?: number;
    data?: PictureTagCategory;
    message?: string;
  };

  type BaseResponsePictureVO_ = {
    code?: number;
    data?: PictureVO;
    message?: string;
  };

  type BaseResponseSpaceVO_ = {
    code?: number;
    data?: SpaceVO;
    message?: string;
  };

  type DeleteRequest = {
    id?: number;
  };

  type getPictureVOByIdUsingGETParams = {
    /** id */
    id?: number;
  };

  type listUserUsingGETParams = {
    current?: number;
    id?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type LoginUserVO = {
    createTime?: string;
    editTime?: string;
    id?: number;
    token?: string;
    updateTime?: string;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type PagePicture_ = {
    current?: number;
    pages?: number;
    records?: Picture[];
    size?: number;
    total?: number;
  };

  type PagePictureVO_ = {
    current?: number;
    pages?: number;
    records?: PictureVO[];
    size?: number;
    total?: number;
  };

  type PageSpace_ = {
    current?: number;
    pages?: number;
    records?: Space[];
    size?: number;
    total?: number;
  };

  type PageSpaceVO_ = {
    current?: number;
    pages?: number;
    records?: SpaceVO[];
    size?: number;
    total?: number;
  };

  type PageUserVO_ = {
    current?: number;
    pages?: number;
    records?: UserVO[];
    size?: number;
    total?: number;
  };

  type Picture = {
    category?: string;
    createTime?: string;
    editTime?: string;
    id?: number;
    introduction?: string;
    isDelete?: number;
    name?: string;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    spaceId?: number;
    tags?: string;
    thumbnailUrl?: string;
    updateTime?: string;
    url?: string;
    userId?: number;
  };

  type PictureEditRequest = {
    category?: string;
    id?: number;
    introduction?: string;
    name?: string;
    tags?: string[];
  };

  type PictureQueryRequest = {
    category?: string;
    current?: number;
    endEditTime?: string;
    id?: number;
    introduction?: string;
    name?: string;
    nullSpaceId?: boolean;
    page?: number;
    pageSize?: number;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    reviewMessage?: string;
    reviewStatus?: number;
    reviewTime?: string;
    reviewerId?: number;
    searchText?: string;
    sortField?: string;
    sortOrder?: string;
    spaceId?: number;
    startEditTime?: string;
    tags?: string[];
    userId?: number;
  };

  type PictureReviewRequest = {
    id?: number;
    reviewMessage?: string;
    reviewStatus?: number;
  };

  type PictureTagCategory = {
    categoryList?: string[];
    tagList?: string[];
  };

  type PictureUpdateRequest = {
    category?: string;
    id?: number;
    introduction?: string;
    name?: string;
    tags?: string[];
  };

  type PictureUploadByBatchRequest = {
    count?: number;
    namePrefix?: string;
    searchText?: string;
  };

  type PictureUploadRequest = {
    fileUrl?: string;
    id?: number;
    picName?: string;
    spaceId?: number;
  };

  type PictureVO = {
    category?: string;
    createTime?: string;
    editTime?: string;
    id?: number;
    introduction?: string;
    name?: string;
    permissionList?: string[];
    picColor?: string;
    picFormat?: string;
    picHeight?: number;
    picScale?: number;
    picSize?: number;
    picWidth?: number;
    spaceId?: number;
    tags?: string[];
    thumbnailUrl?: string;
    updateTime?: string;
    url?: string;
    user?: UserVO;
    userId?: number;
  };

  type Space = {
    createTime?: string;
    editTime?: string;
    id?: number;
    isDelete?: number;
    maxCount?: number;
    maxSize?: number;
    spaceLevel?: number;
    spaceName?: string;
    totalCount?: number;
    totalSize?: number;
    updateTime?: string;
    userId?: number;
  };

  type SpaceAddRequest = {
    spaceLevel?: number;
    spaceName?: string;
  };

  type SpaceEditRequest = {
    id?: number;
    spaceName?: string;
  };

  type SpaceLevel = {
    maxCount?: number;
    maxSize?: number;
    text?: string;
    value?: number;
  };

  type SpaceQueryRequest = {
    current?: number;
    id?: number;
    page?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: string;
    spaceLevel?: number;
    spaceName?: string;
    spaceType?: number;
    userId?: number;
  };

  type SpaceVO = {
    createTime?: string;
    editTime?: string;
    id?: number;
    maxCount?: number;
    maxSize?: number;
    permissionList?: string[];
    spaceLevel?: number;
    spaceName?: string;
    spaceType?: number;
    totalCount?: number;
    totalSize?: number;
    updateTime?: string;
    user?: UserVO;
    userId?: number;
  };

  type uploadPictureUsingPOSTParams = {
    fileUrl?: string;
    id?: number;
    picName?: string;
    spaceId?: number;
  };

  type UserEmailLoginRequest = {
    code?: string;
    email?: string;
  };

  type UserLoginRequest = {
    userAccount?: string;
    userPassword?: string;
  };

  type UserRegisterRequest = {
    checkPassword?: string;
    userAccount?: string;
    userPassword?: string;
  };

  type UserSendCodeRequest = {
    email?: string;
  };

  type UserUpdateRequest = {
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };

  type UserVO = {
    createTime?: string;
    id?: number;
    userAccount?: string;
    userAvatar?: string;
    userName?: string;
    userProfile?: string;
    userRole?: string;
  };
}
