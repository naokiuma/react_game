import styled from 'styled-components';

export const SMainInfo = styled.section`
	width:60%;
	._each{
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
		i{
			margin-right: 10px;
		}
		h3{
			font-size: 30px;
		}
		figure{
			width: 300px;
			border-radius: 30px;
			overflow: hidden;
		}
		div{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			p{
				margin-top:20px;
			}
		}
	}
}`
