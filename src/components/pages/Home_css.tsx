import styled from 'styled-components';

export const SMainInfo = styled.section`
	width:50%;
	._each{
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
		&:first-child{
			margin-top:0
		}
		i{
			margin-right: 10px;
		}
		h3{
			font-size: 18px;
		}
		figure{
			width: 230px;
			border-radius: 30px;
			overflow: hidden;
		}
		div{
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			text-align: center;
			width:50%;
			p{
				margin-top:20px;
			}
		}
	}
}`
