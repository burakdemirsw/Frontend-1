import { UserDetailDTO } from './userDetailDTO';
import { UserDTO } from './userDTO';

export class CreateUserDTO {
  constructor(userDTO: UserDTO, userDetailDTO: UserDetailDTO) {
    this.userDTO = userDTO;
    this.userDetailDTO = userDetailDTO;
  }
  userDTO!: UserDTO;
  userDetailDTO!: UserDetailDTO;
}
